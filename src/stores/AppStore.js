import { observable, computed, action, autorun } from 'mobx';
import { Patrol } from '../models'

export default class AppStore {
  @observable patrol = null;

  @action createPatrol() {
    console.log("Creating new patrol");
    this.patrol = new Patrol({ shipName: "Tang", startDate: "01-01-1942" });
  }
}
