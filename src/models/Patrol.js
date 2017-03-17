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
  randomEventHasHappened = false;

  static GetPatrolDefaults () {
    let props = { shipName: "Tang", base: "Pearl Harbor", startMonth:"11", startYear:"1941" }
    return observable(props);
  }

  constructor(store={}) {
    this.store = store;
    extendObservable(this, store);
    this.startDate = new Date(this.startYear, this.startMonth, 1);
    this.endDate = moment(this.startDate).add(1, 'month').toDate();
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
      const encounter = Encounter.CreateEncounter(this);
      this.searching = false;
      this.currentEncounter = encounter;
    });
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
    travelBox.rollForWeather(this.currentTravelBox && this.currentTravelBox.weather);
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
