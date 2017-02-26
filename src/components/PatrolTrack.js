import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject("appStore") @observer
export default class PatrolTrack extends Component {
  render() {
    const appStore = this.props.appStore;
    const patrol = appStore.patrol;

    return (
      <div>
        <h2>Patrol Track</h2>
      </div>
    );
  }
}
