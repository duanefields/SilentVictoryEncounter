import React, { Component } from 'react';
import mobx from 'mobx';
import { inject, observer } from 'mobx-react';
import moment from 'moment'
import { If } from '../lib'

@inject("appStore") @observer
export default class PatrolComplete extends Component {

  render() {
    const appStore = this.props.appStore;
    const patrol = appStore.patrol;
    const encounters = patrol.encounters.map(this.renderEncounter);
    //console.log(JSON.stringify(patrol.encounters.map(mobx.toJS)));

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

        <div className="text-center row">
          <div className="offset-2 col-8" style={ {height:'5em', marginTop:'1em'} }>
            <button className="btn btn-primary btn-block" onClick={patrol.newPatrol}>
              Begin New Patrol
            </button>
          </div>
        </div>
      </div>
    );
  }

  renderEncounter(encounter, index) {
    return encounter.contacts.map((c,index2) => {
      let key = `${++index}.${++index2}`
      return(
        <tr key={key}>
          <td>{key}</td>
          <td className="nowrap">
            {moment(encounter.date).format("D MMM. HH:mm")}
          </td>
          <td className="nowrap">
            {encounter.travelBox.displayName}
          </td>
          <td className="nowrap">
            {encounter.weather.description}
          </td>
          <td>
            {c.type}
          </td>
          <td>
            <If cond={c.tonnage}>
              <span>
                {c.name} - {c.tonnage && c.tonnage.toLocaleString()} tons
              </span>
            </If>
            <If cond={c.entryType === 'Aircraft'}>
              <span>
                Aircraft - "{c.codeName}"
              </span>
            </If>
          </td>
        </tr>
      );
    });
  }

}
