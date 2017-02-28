import { observable, computed, extendObservable } from 'mobx';
import { inject, observer } from 'mobx-react';
import random from "../lib/random";
import Encounters from "../data/encounters.json";
import { Contact } from "../models"

export default class Encounter {
  @observable time = null;
  @observable encounterType = null;
  @observable contacts;

  static CreateEncounter (travelBox) {
    const encounterTypes = Encounters[travelBox.name];
    var encounterType = random.pick2D6(encounterTypes);

    // if SJ rolled, roll again (once)
    if (encounterType === "SJ") {
      // todo: note this re-roll in the log, as "detected on radar"
      encounterType = random.pick2D6(encounterTypes);
      // if it happens again, treat as no encounter
      if (encounterType === "SJ") {
        encounterType = "-";
      }
    }

    const contacts = Contact.CreateContacts(encounterType);
    return new Encounter({encounterType, contacts});
  }

  constructor(store={}) {
    extendObservable(this, store);
    console.log("Created encounter", this.description);

    // ships
    // time of day
    // weather
    // ships
    // escort quality
    // roll again for SJ (if not disabled)
  }

  @computed get description () {
    return `Encounter: ${this.encounterType} (${JSON.stringify(this.contacts)})`;
  }

  @computed get isNaval () {
    return this.encounterType != "Aircraft" &&
           this.encounterType != "Minefield" &&
           this.encounterType != "-";
  }


}
