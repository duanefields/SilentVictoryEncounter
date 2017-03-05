import { observable, computed, action, extendObservable } from 'mobx';
import { PatrolAssignment, Encounter } from "../models";
import _ from 'lodash'

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

  constructor(store={}) {
    this.store = store;
    extendObservable(this, store);
    this.startDate = new Date(this.startYear, this.startMonth-1, 1);

    // calculate end date
    if (this.startMonth === 11) {
      this.endDate = new Date(this.startYear+1, 0, 1)
    } else {
      this.endDate = new Date(this.startYear, this.startMonth, 1)
    }

    // determine assignment
    this.assignment = PatrolAssignment.CreateAssignment(this.base, this.startDate);
    this.moveToNextTravelBox();
  }

  @action
  newEncounter = () => {
    const encounter = Encounter.CreateEncounter(this.currentTravelBox);
    this.currentEncounter = encounter;
  }

  @action
  moveToTravelBox = (travelBox) => {
    if (this.currentEncounter != null) {
      this.encounters.push(this.currentEncounter);
    }
    this.currentEncounter = null;
    this.currentTravelBox = travelBox;
  }

  @action
  moveToNextTravelBox = () => {
    if (this.currentTravelBox == null) {
      return this.moveToTravelBox(_.first(this.assignment.travelBoxes));
    }
    let index = this.assignment.travelBoxes.indexOf(this.currentTravelBox);
    index++;
    if (index >= this.assignment.travelBoxes.length) {
      // do nothing, at the end
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
