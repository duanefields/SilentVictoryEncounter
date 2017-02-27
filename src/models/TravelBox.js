import { computed } from 'mobx';
import encounters from "../data/encounters.json";
import random from "../lib/random";
import _ from "lodash";

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
    const roll = _.sum(random.dice(6, 2)) - 2; // 2d6, adjusted for offset
    return this.encounterTypes[roll];
  }
}
