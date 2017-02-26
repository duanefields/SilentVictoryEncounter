import { observable } from 'mobx';
import { TravelBox } from "../models"
import patrolAssignments from "../data/patrolAssignments.json"

export default class PatrolAssignment {
  // these don't change, do they need to be observable?
  @observable name = null;
  @observable travelBoxes = null;

  static CreateAssignment (base, date) {
    // return patrol assignment based on year, and base
    if (true)
      return new PatrolAssignment("China Sea");
  }

  constructor(name) {
    const assignment = patrolAssignments[name];
    this.name = name;
    this.travelBoxes = assignment.travelBoxes.map((box) => {
      return new TravelBox(box);
    });
  }

}
