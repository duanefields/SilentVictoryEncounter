import React, { Component } from 'react';
import mobx from 'mobx';
import { inject, observer } from 'mobx-react';
import moment from 'moment'

@inject("appStore") @observer
export default class PatrolComplete extends Component {

  render() {
    const appStore = this.props.appStore;
    const patrol = appStore.patrol;
    const encounters = patrol.encounters.map(this.renderEncounter);
    console.log(JSON.stringify(patrol.encounters.map(mobx.toJS)));

    return (
      <div className="text-center">
        <h1>Patrol Complete</h1>
        <h2>Welcome back to {patrol.base}</h2>

        <table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Date</th>
              <th>Location</th>
              <th>Conditions</th>
              <th>Type</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {encounters}
          </tbody>
        </table>

        <div style={ {height: '5em'} }>&nbsp;</div>

        <div className="text-center row">
          <div className="offset-2 col-8" style={ {height: '5em'} }>
            <button className="btn btn-primary btn-block" onClick={patrol.newPatrol}>
              Begin New Patrol
            </button>
          </div>
        </div>
      </div>
    );
  }

  renderEncounter(encounter, index) {
    let contacts = encounter.contacts.map(c => {
      return(
        <span>{c.type}: {c.name} ({c.tonnage.toLocaleString()} tons), </span>
      );
    });

    return (
      <tr key={encounter.date.toString()}>
        <td>{++index}</td>
        <td>
          {moment(encounter.date).format("D MMM. HHmm")}
        </td>
        <td>
          {encounter.travelBox.displayName}
        </td>
        <td>
          {encounter.weather.description}
        </td>
        <td>
          {encounter.encounterType}
        </td>
        <td>
          { contacts }
        </td>
      </tr>
    );
  }

}
