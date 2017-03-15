import { computed } from 'mobx';
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
  }

  @computed get isShallow() {
    return this.name === "China Sea";
  }
}
