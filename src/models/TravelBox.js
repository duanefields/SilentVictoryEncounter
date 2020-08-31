import { computed } from 'mobx';
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

  rollForWeather (currentWeather) {
    let w = null;
    const roll = random.roll1D6();
    switch(roll) {
      case 1:
      case 2:
      case 3:
        w = { type:"clear", description:"Clear", modifier:null };
        break;
      case 4:
      case 5:
        w = { type:"rain", description:"Rain/Snow", modifier:"No long range attacks" };
        break;
      case 6:
        w = { type:"fog", description:"Fog/Mist",  modifier: "Only short range attacks" };
        break;
      default:
        throw new Error("Invalid roll: " + roll)
    }
    this.weather = w;

    // check for storms
    if (currentWeather != null && currentWeather.type === "rain" && w === "rain") {
      const stormRoll = random.roll1D6();
      if (stormRoll === 6)
        this.weather = { type:"storm", description:"Storm", modifier:"No contacts can be made"}
    }
  }

  @computed get isShallow() {
    return this.name === "China Sea";
  }
}
