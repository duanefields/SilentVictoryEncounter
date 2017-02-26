import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject("appStore") @observer
export default class PatrolSummary extends Component {

  render() {
    const appStore = this.props.appStore;
    const patrol = appStore.patrol;

    return (
      <div>
        <h2>{ patrol.shipName }</h2>
        <div>Start Date: { patrol.startDate }</div>
      </div>
    );
  }
}
