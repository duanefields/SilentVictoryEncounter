import { observable, computed, action, extendObservable } from 'mobx';
import { PatrolAssignment, Encounter } from "../models";
import _ from 'lodash';
import moment from 'moment';
import Promise from 'bluebird'
import random from "../lib/random";

export default class Patrol {
  @observable startMonth = null;
  @observable startYear = null;
  @observable startDate = null;
  @observable endDate = null;
  @observable shipName = null;
  @observable assignment = null;
  @observable base = null;
  @observable encounters = [];
  @observable currentTravelBox = null;
  @observable currentEncounter = null;
  @observable searching = false;
  @observable isComplete = false;
  @observable SDRadarOperational = true;
  @observable SJRadarFunctional = true;
  @observable currentDate = null;
  randomEventHasHappened = false;

  static GetPatrolDefaults () {
    let props = { shipName: "Tang", base: "Pearl Harbor", startMonth:11, startYear:1941 }
    return observable(props);
  }

  constructor(store={}) {
    this.store = store;
    extendObservable(this, store);

    // don't start before Perl Harbor
    const startDay = this.startYear === 1941 ? 8 : 1;
    this.startDate = new Date(this.startYear, this.startMonth, startDay);
    // don't always start on the 1st
    if (this.startYear !== 1941)
      this.currentDate = moment(this.currentDate).add(random.integer(0,4), 'day').toDate();

    this.endDate = moment(this.startDate).add(2, 'month').toDate();
    this.currentDate = moment(this.startDate).toDate();
    console.log("Patrol Range", this.startDate, this.endDate);
    this.toggleSJRadarOperational = this.toggleSJRadarOperational.bind(this);
    this.toggleSDRadarOperational = this.toggleSDRadarOperational.bind(this);
  }

  // available July 1942 or later
  @computed get SJRadarAvailable() {
    if (this.startYear > 1942)
      return true;
    return this.startYear === 1942 && this.startMonth >= 6; // jan is 0
  }

  @computed get SJRadarOperational() {
    return this.SJRadarAvailable && this.SJRadarFunctional;
  }

  @action
  toggleSDRadarOperational() {
    this.SDRadarOperational = !this.SDRadarOperational;
    console.log(`SD Radar is now ${this.SDRadarOperational}`);
  }

  @action
  toggleSJRadarOperational() {
    this.SJRadarFunctional = !this.SJRadarFunctional;
    console.log(`SJ Radar is now ${this.SJRadarOperational}`);
  }

  @action
  newPatrol = () => {
    this.store.patrol = null;
  }

  @action
  beginPatrol = () => {
    // determine assignment
    this.assignment = PatrolAssignment.CreateAssignment(this.base, this.startDate);
    this.moveToNextTravelBox();
  }

  @action
  newEncounter = () => {
    this.searching = true;
    this.currentEncounter = null;
    Promise.delay(1 * 1000).then( () => {
      // add some time for each encounter
      let m = moment(this.currentDate);
      m.add(random.integer(0,2), 'day');
      m.hour(random.integer(0, 23)).minutes(random.integer(0, 59));
      this.currentDate = m.toDate();
      const encounter = Encounter.CreateEncounter(this);
      this.searching = false;
      this.currentEncounter = encounter;
    });
  }

  @computed get isNight () {
    let m = moment(this.currentDate);
    return m.hour() >= 18 || m.hour() <= 6;
  }

  @action
  clearCurrentEncounter = () => {
    if (this.currentEncounter != null) {
      this.encounters.push(this.currentEncounter);
    }
    this.currentEncounter = null;
  }

  @action
  moveToTravelBox = (travelBox) => {
    // encounter should be null or "no contacts"
    this.currentEncounter = null;

    // generate weather for the new box
    let currentWeather = this.currentTravelBox && this.currentTravelBox.weather;
    travelBox.rollForWeather(currentWeather);

    // advance the clock to account for travel in the current box
    if (this.currentTravelBox != null) {
      this.currentDate = moment(this.currentDate).add(random.integer(3,4), 'day');
      console.log("It is now", this.currentDate);
    }

    // move
    this.currentTravelBox = travelBox;
    console.log("Now at box", this.currentTravelBox.name);
  }

  @action
  abort = () => {
    // move to nearest travel box (forwards are backwards, but for simplicity sake forwards)
    this.moveToTravelBox(this.assignment.travelBoxes[this.assignment.travelBoxes.length - 2]);
  }

  @action
  moveToNextTravelBox = () => {
    if (this.currentTravelBox == null) {
      return this.moveToTravelBox(_.first(this.assignment.travelBoxes));
    }
    let index = this.assignment.travelBoxes.indexOf(this.currentTravelBox);
    index++;
    if (index >= this.assignment.travelBoxes.length) {
      // do nothing, at the end because we moved beyond the last box
      this.isComplete = true;
      return;
    }
    this.moveToTravelBox(this.assignment.travelBoxes[index]);
  }

  @action
  moveToPreviousTravelBox = () => {
    if (this.currentTravelBox == null) {
      return this.moveToTravelBox(_.first(this.assignment.travelBoxes));
    }
    let index = this.assignment.travelBoxes.indexOf(this.currentTravelBox);
    index--;
    if (index < 0) {
      // do nothing, at the beginning
      return;
    }
    this.moveToTravelBox(this.assignment.travelBoxes[index]);
  }

}
