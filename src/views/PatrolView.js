import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { If } from '../lib'
import { Provider } from 'mobx-react';
import { AppStore } from '../stores';
import { NewPatrol, Patrol } from '../components'

@observer
export default class PatrolView extends Component {
  appStore = new AppStore();

  constructor(props) {
    super(props);
    // default data for testing
    this.appStore.createPatrol({ shipName: "Tang", startDate: "01-01-1942" });
  }

  render() {
    const appStore = this.appStore;
    const patrol = appStore.patrol;

    return (
      <Provider appStore={appStore}>
        <div>
          <If cond={patrol}>
            <Patrol />
          </If>

          <If cond={!patrol}>
            <NewPatrol />
          </If>
        </div>
      </Provider>
    );
  }
}
