import { observable, computed, autorun } from 'mobx';
import encounters from "../data/encounters.json";
import random from "../lib/random";

export default class TravelBox {
  name = null;
  displayName = null;
  isMissionBox = null;

  constructor(box) {
    this.name = box.name;
    this.displayName = box.displayName ? box.displayName : box.name;
    this.isMissionBox = box.isMissionBox === true;
    this.times = box.times > 0 ? box.times : 1;
    this.encounterTypes = encounters[this.name];

    if (! this.encounterTypes) {
      console.log(`No encounter types defined for "${box.name}"`);
      this.encounterTypes = [];
    }
  }

  @computed get isShallow() {
    this.name === "China Sea";
  }

  rollEncounterType = () => {
    return random.pick(this.encounterTypes);
  }
}
