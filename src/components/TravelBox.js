import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject("appStore") @observer
export default class TravelBox extends Component {
  render() {
    const appStore = this.props.appStore;
    const patrol = appStore.patrol;

    return (
      <button className="btn btn-secondary">
        {this.props.box.name}
      </button>
    );
  }
}
