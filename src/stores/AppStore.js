import { observable, action } from 'mobx';
import { Patrol } from '../models'

export default class AppStore {
  // load these from local storage or set sane defaults
  @observable patrol;

  @action
  createPatrol(props) {
    console.log("Creating new patrol");
    this.patrol = new Patrol(props);
  }
}
