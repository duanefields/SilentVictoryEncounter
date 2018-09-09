import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { If } from '../lib'
import { NewPatrol, Patrol } from '../components'
import { Patrol as PatrolModel } from '../models'

@inject("appStore") @observer
@observer
export default class PatrolView extends Component {

  render() {
    const patrol = this.props.appStore.patrol;
    const defaultPatrol = PatrolModel.GetPatrolDefaults();

    return (
        <div>
          <If cond={patrol}>
            <Patrol />
          </If>

          <If cond={!patrol}>
            <NewPatrol patrol={defaultPatrol} />
          </If>
        </div>
    );
  }
}
