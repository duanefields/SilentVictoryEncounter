import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { PatrolHeader, PatrolTrack, Encounter, PatrolComplete } from '../components'
import { If } from '../lib'
import css from './Patrol.css'

@inject("appStore") @observer
export default class Patrol extends Component {

  render() {
    const appStore = this.props.appStore;
    const patrol = appStore.patrol;
    const encounter = patrol.currentEncounter;

    if (encounter && encounter.encounterType !== '-') {
      return this.renderContact();
    } else if (patrol.isComplete) {
      return this.renderEndOfPatrol();
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

        <div className={css.contact}>
          <If cond={encounter}>
            <span>No Contacts Found</span>
          </If>
          <If cond={! encounter}>
            { patrol.searching &&
              <span>Searching...</span>
            }
          </If>
          <If cond={!encounter && !patrol.searching}>
            <span>Arrived in {patrol.currentTravelBox.displayName}</span>
          </If>
        </div>

        <div className="text-center row">
          <div className="offset-2 col-8" style={ {height: '5em'} }>
            <button className="btn btn-secondary btn-block" onClick={patrol.moveToNextTravelBox}>
              Travel to Next Transit Box
            </button>
          </div>

          <div className="offset-2 col-8" style={ {height: '5em'} }>
            <button className="btn btn-primary btn-block" onClick={patrol.newEncounter} disabled={patrol.searching}>
              Roll for Encounter
            </button>
          </div>


          <div className="offset-2 col-8" style={ {height: '5em'} }>
            <button className="btn btn-danger btn-block" onClick={patrol.abort}>
              Abort Patrol
            </button>
          </div>
        </div>
      </div>
    );
  }

  renderEndOfPatrol() {
    return (
      <PatrolComplete/>
    );
  }


  // todo: move to its own component
  renderContact() {
    const appStore = this.props.appStore;
    const patrol = appStore.patrol;

    return (
      <div className="text-center">

        <Encounter/>

        <div className="text-center row">
          <div className={ css.button + " offset-2 col-8" }>
            <button className="btn btn-primary btn-block" onClick={patrol.clearCurrentEncounter}>
              Combat Complete
            </button>
          </div>
        </div>

      </div>
    );
  }
}
