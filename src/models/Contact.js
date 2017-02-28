import { observable, computed, extendObservable } from 'mobx';
import random from "../lib/random";

import CapitalShips from "../data/capitalships.json";
import Warships from "../data/warships.json";
import Freighters from "../data/freighters.json";

import CapitalEscortsEarlyWar from "../data/capitalEscorts-earlyWar.json";
import CapitalEscortsLateWar from "../data/capitalEscorts-lateWar.json";
import MerchantEscortsEarlyWar from "../data/merchantEscorts-earlyWar.json";
import MerchantEscortsLateWar from "../data/merchantEscorts-lateWar.json";

export default class Contact {
  @observable entryName = null;
  @observable name = null;
  @observable tonnage = null;
  @observable entryType = null;
  @observable type = null;

  static CreateContacts (encounterType) {
    switch(encounterType) {
      case "-":
        return [];
      case "Ship":
        return [Contact.RandomFreighter()];
      case "Aircraft":
        return ["Aircraft"];
      case "Warship":
        return ["Warship"];
      case "Capital Ship":
        return [Contact.RandomCapitalShip(), Contact.RandomCapitalEscort()];
      case "Ship+Escort":
        return [Contact.RandomFreighter(), Contact.RandomMerchantEscort()];
      case "Two Ships+Escort":
        return [Contact.RandomFreighter(), Contact.RandomFreighter(), Contact.RandomMerchantEscort()];
      case "Convoy":
        return [Contact.RandomFreighter(), Contact.RandomFreighter(), Contact.RandomFreighter(), Contact.RandomMerchantEscort()];
      case "Minefield":
        return ["Minefield"];
      default: throw `Unexpected encounter type ${encounterType}`;
    }
    return ["Contact1", "Contact2"];
  }

  // todo: as each one is returned, it needs to be removed from the list to avoid dupes
  static RandomFreighter() { return new Contact(random.pick(Freighters)); }
  static RandomCapitalShip() { return new Contact(random.pick(CapitalShips)); }
  static RandomWarship() { return new Contact(random.pick(Warships)); }

  // todo: late war vs early war
  static RandomCapitalEscort() { return new Contact(random.pick(CapitalEscortsEarlyWar)); }
  static RandomMerchantEscort() { return new Contact(random.pick(MerchantEscortsEarlyWar)); }

  constructor(store={}) {
    extendObservable(this, store);
  }

  @computed get description () {
    `${this.type}: ${this.name} - ${this.tonnage} tons`;
  }

  static rollEscortQuality (year) {
    const roll = random.roll1D6();
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
      return "Trained"
    }
  }

}
