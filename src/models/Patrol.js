import { observable, computed, action, autorun, extendObservable } from 'mobx';

export default class Patrol {
  @observable startDate = '0-0-0000';
  @observable shipName = "Default";

  constructor(store={}) {
    this.store = store;
    extendObservable(this, store);
    console.log("Patrol", this);
  }

}
