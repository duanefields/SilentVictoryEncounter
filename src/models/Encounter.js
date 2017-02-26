import { observable, computed, autorun } from 'mobx';

export default class Encounter {
  constructor(store) {
    this.store = store;
  }
}
