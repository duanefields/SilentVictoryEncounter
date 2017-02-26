import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { PatrolTrack } from '../components'

@inject("appStore") @observer
export default class Patrol extends Component {

  render() {
    const appStore = this.props.appStore;
    const patrol = appStore.patrol;

    return (
      <div className="text-center">
        <h2>{ patrol.shipName }</h2>
        <div>Start Date: { patrol.startDate }</div>
        <PatrolTrack/>
      </div>
    );
  }
}
