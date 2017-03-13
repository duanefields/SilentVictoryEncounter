import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { PatrolHeader, PatrolTrack, Encounter } from '../components'
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
        </div>

        <div className="text-center row">
          <div className="offset-2 col-8" style={ {height: '5em'} }>
            <button className="btn btn-secondary btn-block" onClick={patrol.moveToNextTravelBox}>
              Next Transit Box
            </button>
          </div>

          <div className="offset-2 col-8" style={ {height: '5em'} }>
            <button className="btn btn-primary btn-block" onClick={patrol.newEncounter}>
              Search
            </button>
          </div>


          <div className="offset-2 col-8" style={ {height: '5em'} }>
            <button className="btn btn-danger btn-block" onClick={patrol.abort}>
              Abort
            </button>
          </div>
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
