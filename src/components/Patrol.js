import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { PatrolHeader, PatrolTrack, Encounter } from '../components'

@inject("appStore") @observer
export default class Patrol extends Component {

  render() {
    const appStore = this.props.appStore;
    const patrol = appStore.patrol;

    return (
      <div className="text-center">
        <PatrolHeader/>
        <PatrolTrack/>
        <Encounter/>
      </div>
    );
  }
}
