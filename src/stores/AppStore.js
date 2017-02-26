import { observable, action } from 'mobx';
import { Patrol } from '../models'

export default class AppStore {
  @observable patrol = null;

  @action
  createPatrol(props) {
    console.log("Creating new patrol");
    this.patrol = new Patrol(props);
  }
}
