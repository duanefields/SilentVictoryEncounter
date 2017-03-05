import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { If } from '../lib'
import { Provider } from 'mobx-react';
import { AppStore } from '../stores';
import { NewPatrol, Patrol } from '../components'
import { Patrol as PatrolModel } from '../models'

@observer
export default class PatrolView extends Component {
  appStore = new AppStore();

  constructor(props) {
    super(props);
  }

  render() {
    const appStore = this.appStore;
    const patrol = appStore.patrol;
    const defaultPatrol = PatrolModel.GetPatrolDefaults();

    return (
      <Provider appStore={appStore}>
        <div>
          <If cond={patrol}>
            <Patrol />
          </If>

          <If cond={!patrol}>
            <NewPatrol patrol={defaultPatrol} />
          </If>
        </div>
      </Provider>
    );
  }
}
