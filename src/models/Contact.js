import { observable, computed, autorun } from 'mobx';

export default class Contact {
  constructor(store) {
    this.store = store;
  }
}
