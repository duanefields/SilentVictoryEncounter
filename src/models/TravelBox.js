import { computed } from 'mobx';
import _ from "lodash";
import random from "../lib/random";

export default class TravelBox {
  name = null;
  displayName = null;
  isMissionBox = null;

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

  constructor(box) {
    this.name = box.name;
    this.displayName = box.displayName ? box.displayName : box.name;
    this.isMissionBox = box.isMissionBox === true;
    this.times = box.times > 0 ? box.times : 1;
    this.weather = TravelBox.rollWeather();
  }

  @computed get isShallow() {
    return this.name === "China Sea";
  }
}
