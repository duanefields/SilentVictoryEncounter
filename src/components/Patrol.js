import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { PatrolHeader, PatrolTrack, Encounter } from '../components'
import { If } from '../lib'

@inject("appStore") @observer
export default class Patrol extends Component {

  render() {
    const appStore = this.props.appStore;
    const patrol = appStore.patrol;
    const encounter = patrol.currentEncounter;

    if (encounter && encounter.encounterType !== '-') {
      return this.renderContact();
    } else {
      return this.renderTransitBox();
    }
  }

  renderTransitBox() {
    const appStore = this.props.appStore;
    const patrol = appStore.patrol;
    const encounter = patrol.currentEncounter;

    return (
      <div className="text-center">
        <PatrolHeader/>

        <PatrolTrack/>

        <If cond={encounter}>
          <span>No Contacts</span>
        </If>
        <If cond={! encounter}>
          <span>&nbsp;</span>
        </If>

        <div className="text-center">
          <button className="btn btn-primary" onClick={patrol.newEncounter}>
            Search
          </button>
          <br/>
          <button className="btn btn-secondary" onClick={patrol.moveToPreviousTravelBox}>
            Previous
          </button>
          <button className="btn btn-secondary" onClick={patrol.moveToNextTravelBox}>
            Next
          </button>
          <button className="btn btn-secondary" onClick={patrol.abort}>
            Abort
          </button>
        </div>
      </div>
    );
  }

  renderContact() {
    const appStore = this.props.appStore;
    const patrol = appStore.patrol;

    return (
      <div className="text-center">
        <div className="btn-group p-3">
        </div>

        <Encounter/>

        <button className="btn btn-secondary" onClick={patrol.clearCurrentEncounter}>
          Combat Complete
        </button>
      </div>
    );
  }
}
