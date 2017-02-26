import { observable, computed, action, autorun, extendObservable } from 'mobx';
import { TravelBox } from "../models"
import patrolAssignments from "../data/patrolAssignments.json"

export default class PatrolAssignment {
  @observable name = null;
  @observable travelBoxes = null;

  constructor(name) {
    const assignment = patrolAssignments[name];
    this.name = name;
    this.travelBoxes = assignment.travelBoxes.map((name) => new TravelBox(name));
  }

  static CreateAssignmentForDate (date) {
    return this.ChinaSea();
  }

  static ChinaSea () {
    return new PatrolAssignment("China Sea");
  }

}
