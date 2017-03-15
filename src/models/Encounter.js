import { observable, computed, extendObservable } from 'mobx';
import { inject, observer } from 'mobx-react';
import random from "../lib/random";
import Encounters from "../data/encounters.json";
import { Contact } from "../models"
import moment from "moment";
import RandomEvents from "../data/randomEvents.json";

export default class Encounter {
  date = null;
  encounterMoment = null;
  encounterType = null;
  contacts = null;
  weather = null;
  surprised = null;
  event = null;

  static CreateEncounter (patrol) {
    let travelBox = patrol.currentTravelBox;
    let startDate = patrol.startDate;

    const encounterTypes = Encounters[travelBox.name];
    if (encounterTypes.length === 0)
      throw new Error(`Invalid encounter type ${encounterType} for ${travelBox.name}`);

    // check for random events
    let encounterType = null;
    if (!patrol.randomEventHasHappened) {
      let roll = random.roll2D6();
      if (roll !== 12) {
        encounterType = encounterTypes[roll-2];
      } else {
        patrol.randomEventHasHappened = true;
        encounterType = "Random Event";
        let event = random.pick2D6(RandomEvents);
        let contacts = [];
        return new Encounter({encounterType, contacts, event});
      }
    } else {
      encounterType = random.pick2D6(encounterTypes);
    }

    // if SJ rolled, roll again (once)
    if (encounterType === "SJ") {
      // todo: note this re-roll in the log, as "detected on radar"
      encounterType = random.pick2D6(encounterTypes);
      // if it happens again, treat as no encounter
      if (encounterType === "SJ") {
        encounterType = "-";
      }
    }

    const contacts = Contact.CreateContacts(encounterType, startDate);
    return new Encounter({encounterType, contacts});
  }

  static rollWeather () {
    const roll = random.roll1D6();
    switch(roll) {
      case 1:
      case 2:
      case 3: return { description:"Clear", modifier:null };
      case 4:
      case 5: return { description:"Rain/Snow", modifier:"No long range attacks" };
      case 6: return { description:"Fog/Mist",  modifier: "Only short range attacks" }; // possible surprise
    }
  }

  constructor(store={}) {
    extendObservable(this, store);

    this.weather = Encounter.rollWeather();
    // if in fog/mist, 50% of being surprised, and the escorts attack first
    this.surprised = this.encounterType !== '-' && this.weather === "Fog/Mist" && random.bool();

    // todo inherit date from patrol, which adds 3-4 days every transit box
    // or maybe move this to patrol and pass it in
    this.encounterMoment = moment().hours(random.integer(0, 23)).minutes(random.integer(0, 59));

    console.log("Created encounter", this.description);

    }

  @computed get description () {
    return `Encounter: ${this.encounterType} (${JSON.stringify(this.contacts)})`;
  }

  @computed get isNight () {
    return this.encounterMoment.hour() >= 18 || this.encounterMoment.hour() <= 6;
  }

  @computed get time () {
    return this.encounterMoment.format("HH:mm");
  }

  @computed get isNaval () {
    return this.encounterType !== "Aircraft" &&
           this.encounterType !== "Minefield" &&
           this.encounterType !== "-";
  }


}
