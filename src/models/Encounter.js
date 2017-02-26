import { observable, computed, autorun } from 'mobx';
import { inject, observer } from 'mobx-react';

@inject("appStore") @observer
export default class Encounter {
  static CreateEncounter () {
  }

  constructor(store) {
    this.store = store;
  }

}
