import { observable } from 'mobx';
import { TravelBox } from "../models"
import patrols from "../data/patrols.json"

export default class PatrolAssignment {
  name = null;
  type = null;
  travelBoxes = null;

  static CreateAssignment (base, date) {
    // return patrol assignment based on year, and base
    if (true)
      return new PatrolAssignment("China Sea");
  }

  constructor(name, type=null) {
    this.name = name;
    this.type = null;
    this.travelBoxes = patrols[name].map((box) => {
      return new TravelBox(box);
    });
  }

}
