import { observable, computed, autorun } from 'mobx';

export default class TravelBox {
  @observable name = null;

  constructor(name) {
    this.name = name;
  }
}
