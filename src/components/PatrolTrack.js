import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { TravelBox } from '../components'

@inject("appStore") @observer
export default class PatrolTrack extends Component {
  render() {
    const appStore = this.props.appStore;
    const patrol = appStore.patrol;
    console.log(patrol);
    console.log("boxes", patrol.assignment.travelBoxes);

    let travelBoxes = patrol.assignment.travelBoxes.map((box, index) =>
      <TravelBox box={box} key={index} />
    );

    return (
      <div className="text-center">
        <div className="btn-group text-center">
          {travelBoxes}
        </div>
      </div>
    );
  }
}
