import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { PatrolHeader, PatrolTrack, Encounter } from '../components'
import { If } from '../lib'

@inject("appStore") @observer
export default class Patrol extends Component {

  render() {
    const appStore = this.props.appStore;
    const patrol = appStore.patrol;

    return (
      <div className="text-center">
        <PatrolHeader/>
        <PatrolTrack/>
        <If cond={patrol.currentEncounter}>
          <Encounter/>
        </If>
      </div>
    );
  }
}
