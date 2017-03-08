import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { PatrolHeader, PatrolTrack, Encounter } from '../components'
import { If } from '../lib'

@inject("appStore") @observer
export default class Patrol extends Component {

  render() {
    const appStore = this.props.appStore;
    const patrol = appStore.patrol;
    const buttonStyle = {
      width: "8em"
    }

    return (
      <div className="text-center">

        <PatrolHeader/>
        <PatrolTrack/>

        <div className="btn-group p-3">
          <button className="btn btn-secondary" onClick={patrol.moveToPreviousTravelBox} style={buttonStyle}>
            Previous
          </button>
          <button className="btn btn-secondary" onClick={patrol.moveToNextTravelBox} style={buttonStyle}>
            Next
          </button>
        </div>

        <If cond={patrol.currentEncounter}>
          <Encounter/>
        </If>

        <If cond={!patrol.currentEncounter}>
          <div className="text-center">
            <button className="btn btn-primary" onClick={patrol.newEncounter}>
              Search
            </button>
          </div>
        </If>

      </div>
    );
  }
}
