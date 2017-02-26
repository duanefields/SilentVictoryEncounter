import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { If } from '../lib'
import { Provider } from 'mobx-react';
import { AppStore } from '../stores';
import { NewPatrol, PatrolSummary } from '../components'

@observer
export default class PatrolView extends Component {
  appStore = new AppStore();

  render() {
    const appStore = this.appStore;
    const patrol = appStore.patrol;

    return (
      <Provider appStore={appStore}>
        <div>
          <h1>Patrol Component</h1>
          <If cond={patrol}>
            <PatrolSummary />
          </If>

          <If cond={!patrol}>
            <NewPatrol />
          </If>

        </div>
      </Provider>
    );
  }
}
