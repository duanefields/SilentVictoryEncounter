import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject("appStore") @observer
export default class NewPatrol extends Component {
  render() {
    const appStore = this.props.appStore;
    const patrol = appStore.patrol;

    return (
      <div>
        <h2>New Patrol</h2>
        <button onClick={appStore.createPatrol.bind(appStore)}>
          Start Patrol
        </button>
      </div>
    );
  }
}
