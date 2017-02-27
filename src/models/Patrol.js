import { observable, computed, action, extendObservable } from 'mobx';
import { PatrolAssignment } from "../models";
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

  constructor(store={}) {
    this.store = store;
    extendObservable(this, store);
    this.startDate = new Date(this.startYear, this.startMonth-1, 1);
    if (this.startMonth === 11) {
      this.endDate = new Date(this.startYear+1, 0, 1)
    } else {
      this.endDate = new Date(this.startYear, this.startMonth, 1)
    }
    this.assignment = PatrolAssignment.CreateAssignment(this.base, this.startDate);
  }

  @action
  newEncounter = () => {
    const encounterType = this.currentTravelBox.rollEncounterType();
    this.encounters.push(`Encounter #${this.encounters.length  + 1} ${encounterType} (${this.currentTravelBox.name})`);
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
