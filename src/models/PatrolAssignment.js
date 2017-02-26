import { observable, computed, action, autorun, extendObservable } from 'mobx';
import { TravelBox } from "../models"

export default class PatrolAssignment {
  @observable name = null;
  @observable travelBoxes = null;

  constructor(store) {
    this.store = store;
    extendObservable(this, store);
  }

  static CreateAssignmentForDate (date) {
    return this.ChinaSea();
  }

  static ChinaSea () {
    let name = "China Sea";
    let travelBoxes = [ new TravelBox("Transit"), new TravelBox("Transit"), new TravelBox("China Sea") ];
    return new PatrolAssignment({ name, travelBoxes});
  }

}
