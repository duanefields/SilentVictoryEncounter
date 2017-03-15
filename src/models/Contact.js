import { observable, computed, extendObservable } from 'mobx';
import random from "../lib/random";

import CapitalShips from "../data/capitalships.json";
import Warships from "../data/warships.json";
import Freighters from "../data/freighters.json";
import Aircraft from "../data/aircraft.json";

import CapitalEscortsEarlyWar from "../data/capitalEscorts-earlyWar.json";
import CapitalEscortsLateWar from "../data/capitalEscorts-lateWar.json";
import MerchantEscortsEarlyWar from "../data/merchantEscorts-earlyWar.json";
import MerchantEscortsLateWar from "../data/merchantEscorts-lateWar.json";

import merchantImage from '../images/merchant.png';
import escortImage from '../images/escort.png';
import warshipImage from '../images/warship.png'
import submarineImage from '../images/submarine.png'
import aircraftImage from '../images/aircraft.png'

export default class Contact {
  @observable entryName = null;
  @observable name = null;
  @observable tonnage = null;
  @observable entryType = null;
  @observable type = null;
  @observable quality = null;

  static CreateContacts (encounterType, startDate) {
    switch(encounterType) {
      case "-":
        return [];
      case "Ship":
        return [Contact.RandomFreighter()];
      case "Warship":
        return [Contact.RandomWarship()];
      case "Capital Ship":
        return [Contact.RandomCapitalShip(), Contact.RandomCapitalEscort(startDate)];
      case "Ship+Escort":
        return [Contact.RandomFreighter(), Contact.RandomMerchantEscort(startDate)];
      case "Two Ships+Escort":
        return [Contact.RandomFreighter(), Contact.RandomFreighter(), Contact.RandomMerchantEscort(startDate)];
      case "Convoy":
        return [Contact.RandomFreighter(), Contact.RandomFreighter(), Contact.RandomFreighter(), Contact.RandomMerchantEscort(startDate)];
      case "Aircraft":
        return [Contact.RandomAircraft(startDate)];
      default: return [];
    }
  }

  static RandomAircraft(startDate) {
    let contact = random.pick(Aircraft);
    contact.entryType = "Aircraft";
    contact.quality = Contact.rollEscortQuality(startDate.getFullYear());
    return new Contact(contact);
  };

  static RandomFreighter() { return Contact.RandomShip(Freighters); }
  static RandomCapitalShip() { return Contact.RandomShip(CapitalShips); }
  static RandomWarship() { return Contact.RandomShip(Warships); }

  static RandomCapitalEscort(startDate) {
    const list = startDate.getFullYear() < 1944 ? CapitalEscortsEarlyWar : CapitalEscortsLateWar;
    return Contact.RandomShip(list, startDate, true);
  }

  static RandomMerchantEscort(startDate) {
    const list = startDate.getFullYear() < 1944 ? MerchantEscortsEarlyWar : MerchantEscortsLateWar;
    return Contact.RandomShip(list, startDate, true);
  }

  // todo: as each one is returned, it needs to be removed from the list to avoid dupes
  static RandomShip(array, startDate=null, escort=false) {
    let contact = random.pick(array);
    if (escort)
      contact.quality = Contact.rollEscortQuality(startDate.getFullYear());
    return new Contact(contact);
  }

  constructor(store={}) {
    extendObservable(this, store);
  }

  @computed get description () {
    return `${this.type}: ${this.name} - ${this.tonnage} tons`;
  }

  @computed get image () {
    switch(this.type) {
      // capital ships
      case "Aircraft Carrier":
      case "Escort Carrier":
      case "Battleship":
        return warshipImage;

      // war ships
      case "Antisubmarine Aircraft Carrier":
      case "Cruiser":
      case "Frigate":
      case "Light Cruiser":
      case "Minelayer":   // also can be escrot
      case "Repair Ship":
        return warshipImage;

      case "Submarine":
        return submarineImage;

      // escorts
      case "Destroyer":   // also can be warship
      case "Destroyer Escort":
      case "Escort":
      case "Gunboat":
      case "Minesweeper":
      case "Subchaser":
      case "Torpedo Boat":
        return escortImage;

      // merchantes
      case "Armed":
      case "Special":
      case "Small Freighter":
      case "Small Passenger":
      case "Small Tanker":
      case "Large Freighter":
      case "Large Passenger":
      case "Large Tanker":
        return merchantImage

      // aircraft
      case "Fighter":
        return aircraftImage;

    }
  }

  @computed get damageRequired() {
    if (this.entryType === 'Capital Ship')
      return 5;
    if (this.tonnage <= 1000)
      return 1;
    if (this.tonnage <= 5000)
      return 2;
    if (this.tonnage <= 9999)
      return 3;
    return 4;
  }

  static rollEscortQuality (year) {
    console.log(`Determining escort for ${year}`);
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
