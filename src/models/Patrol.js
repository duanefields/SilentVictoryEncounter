import { observable, computed, action, autorun, extendObservable } from 'mobx';
import { PatrolAssignment } from "../models";

export default class Patrol {
  @observable startDate = null;
  @observable shipName = null;
  @observable assignment = null;

  constructor(store={}) {
    this.store = store;
    extendObservable(this, store);
    this.assignment = PatrolAssignment.CreateAssignmentForDate(new Date());
  }

}
