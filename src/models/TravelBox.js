import { observable, computed, autorun } from 'mobx';

export default class TravelBox {
  constructor(store) {
    this.store = store;
  }
}
