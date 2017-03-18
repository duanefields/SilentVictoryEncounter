import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { PatrolHeader, PatrolTrack, Encounter, PatrolComplete, RandomEvent, SubStatus } from '../components'
import { If } from '../lib'
import css from './Patrol.css'

@inject("appStore") @observer
export default class Patrol extends Component {

  render() {
    const appStore = this.props.appStore;
    const patrol = appStore.patrol;
    const encounter = patrol.currentEncounter;

    if (encounter && encounter.encounterType === 'Random Event') {
      return this.renderRandomEvent();
    } else if (encounter && encounter.encounterType !== '-') {
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
    const {currentEncounter, currentTravelBox} = patrol;

    return (
      <div className="text-center">
        <PatrolHeader/>

        <PatrolTrack/>

        <div className={css.contact}>
          <div>Weather: {currentTravelBox.weather.description}</div>
          <If cond={currentTravelBox.weather.type === 'storm'}>
            <div>{currentTravelBox.weather.modifier}</div>
          </If>

          <SubStatus/>

          <div className={css.searchBox}>
            <If cond={currentEncounter}>
              <div>No Contacts Found</div>
            </If>
            <If cond={! currentEncounter}>
              { patrol.searching &&
                <div>Searching...</div>
              }
            </If>
            <If cond={!currentEncounter && !patrol.searching}>
              <div>&nbsp;</div>
            </If>
          </div>

          <If cond={!currentEncounter && !patrol.searching}>
            <div>
              <If cond={currentTravelBox.isShallow}>
                <div>Shallow Water</div>
              </If>
            </div>
          </If>
        </div>

        <div className="offset-2 col-8" style={ {height: '4em'} }>
          <button className="btn btn-primary btn-block" onClick={patrol.newEncounter} disabled={patrol.searching || currentTravelBox.weather.type === 'storm'}>
            Roll for Encounter
          </button>
        </div>

        <div className="offset-2 col-8" style={ {height: '4em'} }>
          <button className="btn btn-secondary btn-block" onClick={patrol.moveToNextTravelBox}>
            Travel to Next Transit Box
          </button>
        </div>

        <div className="offset-2 col-8" style={ {height: '4em'} }>
          <button className="btn btn-danger btn-block" onClick={patrol.abort}>
            Abort Patrol
          </button>
        </div>
      </div>
    );
  }

  renderEndOfPatrol() {
    return (
      <PatrolComplete/>
    );
  }

  renderRandomEvent() {
    return (
      <RandomEvent/>
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
              Continue Patrol
            </button>
          </div>
        </div>

      </div>
    );
  }
}
