import { computed } from 'mobx';
import _ from "lodash";
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
  }

  rollForWeather () {
    let w = null;
    const roll = random.roll1D6();
    switch(roll) {
      case 1:
      case 2:
      case 3: w = { description:"Clear", modifier:null }; break;
      case 4:
      case 5: w = { description:"Rain/Snow", modifier:"No long range attacks" }; break;
      case 6: w = { description:"Fog/Mist",  modifier: "Only short range attacks" }; break;
    }
    this.weather = w;
  }

  @computed get isShallow() {
    return this.name === "China Sea";
  }
}
