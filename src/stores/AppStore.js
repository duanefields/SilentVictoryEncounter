import { observable } from 'mobx';

export default class AppStore {
  // load these from local storage or set sane defaults
  @observable patrol = null;

}
