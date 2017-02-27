import { observable, computed, autorun } from 'mobx';
import { inject, observer } from 'mobx-react';
import random from "../lib/random";

@inject("appStore") @observer
export default class Encounter {
  static CreateEncounter () {
  }

  constructor(store) {
    this.store = store;
  }

  rollEscortQuality = (year) => {
    const roll = random.dice(6)
    if (year === 1941 || year === 1942) {
      switch(roll) {
        case 1: return "Green";
        case 2:
        case 3:
        case 4:
        case 5: return "Trained";
        case 6: return "Veteran";
        default: return "Trained";
      }
    } else if (year === 1943 || year === 1944) {
      switch(roll) {
        case 1: return "Green";
        case 2:
        case 3:
        case 4:
          return "Trained";
        case 5: return "Veteran";
        case 6: return "Elite";
        default: return "Trained";
      }
    } else if (year === 1945) {
      switch(roll) {
        case 1:
        case 2:
          return "Green";
        case 3:
        case 4:
          return "Trained";
        case 5: return "Veteran";
        case 6: return "Elite";
        default: return "Trained";
      }
    } else {
      console.log("rollEscortQuality: Unexpected year", year);
      return "trained"
    }
  }

}
