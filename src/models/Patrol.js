import { observable, computed, action, extendObservable } from 'mobx';
import { PatrolAssignment } from "../models";
import _ from 'lodash'

export default class Patrol {
  @observable startDate = null;
  @observable endDate = null;
  @observable shipName = null;
  @observable assignment = null;
  @observable base = null;
  @observable encounters = [];
  @observable currentTravelBox = null;

  constructor(store={}) {
    this.store = store;
    extendObservable(this, store);
    this.assignment = PatrolAssignment.CreateAssignment(this.base, this.startDate);
  }

  @action
  newEncounter = () => {
    console.log("Creating encounter for patrol:", this);
    this.encounters.push(`Encounter #${this.encounters.length  + 1} (${this.currentTravelBox.name})`);
  }

  @computed
  get currentEncounter() {
    return _.last(this.encounters);
  }

  @action
  moveToTravelBox = (travelBox) => {
    this.currentTravelBox = travelBox;
    this.newEncounter();
  }

}
