import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import mobx from 'mobx';
import { If, InputField, SelectBox } from '../lib';
import { Patrol } from '../models';

@inject("appStore") @observer
export default class NewPatrol extends Component {
  constructor(props) {
    super(props);
    this.updateProperty = this.updateProperty.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  updateProperty (key, value) {
    console.log(`Setting ${key} to ${value}`)
    this.props.patrol[key] = value;

    const {patrol} = this.props;
    if (Number(patrol.startYear) === 1941)
      patrol.startMonth = 11;
    if (Number(patrol.startYear) === 1945 && Number(patrol.startMonth) > 5)
      patrol.startMonth = 5;
  }

  render() {
    const {patrol} = this.props;

    return (
      <div>
        <h2>New Patrol</h2>

        <form onSubmit={this.onSubmit}>
          <InputField name="shipName"
            label="Ship Name"
            value={patrol.shipName}
            onChange={this.updateProperty}
            addOn="USS"
          />

          <SelectBox name="base" label="Home Port" value={patrol.base} onChange={this.updateProperty}>
            <option value="Pearl Harbor">Pearl Harbor</option>
            <option value="Australia">Australia</option>
            <option value="Philippines">Philippines</option>
          </SelectBox>

          <div className="row">
            <div className="col-6">
            { Number(patrol.startYear) !== 1941  && Number(patrol.startYear) !== 1945 &&
              <SelectBox name="startMonth" label="Month" value={patrol.startMonth} onChange={this.updateProperty}>
                <option value="0">January</option>
                <option value="1">February</option>
                <option value="2">March</option>
                <option value="3">April</option>
                <option value="4">May</option>
                <option value="5">June</option>
                <option value="6">July</option>
                <option value="7">August</option>
                <option value="8">September</option>
                <option value="9">October</option>
                <option value="10">November</option>
                <option value="11">December</option>
              </SelectBox>
            }
            { Number(patrol.startYear) === 1945 &&
              <SelectBox name="startMonth" label="Month" value={patrol.startMonth} onChange={this.updateProperty}>
                <option value="0">January</option>
                <option value="1">February</option>
                <option value="2">March</option>
                <option value="3">April</option>
                <option value="4">May</option>
                <option value="5">June</option>
              </SelectBox>
            }
            { Number(patrol.startYear) === 1941 &&
              <SelectBox name="startMonth" label="Month" value={patrol.startMonth} onChange={this.updateProperty}>
                <option value="11">December</option>
              </SelectBox>
            }
            </div>

            <div className="col-6">
              <SelectBox name="startYear" label="Year" value={patrol.startYear} onChange={this.updateProperty}>
                <option>1941</option>
                <option>1942</option>
                <option>1943</option>
                <option>1944</option>
                <option>1945</option>
              </SelectBox>
            </div>
          </div>

          <button className="btn btn-primary" type="submit">
            Start Patrol
          </button>
        </form>
      </div>
    );
  }

  // todo, clean this up this whole new patrol setup is wonky
  // rework to not need observable patrol possibly?
  onSubmit(event) {
    console.log("Submitting form");
    event.preventDefault();
    const {appStore, patrol} = this.props;
    let patrolSettings = mobx.toJS(patrol);
    patrolSettings.store = appStore;
    appStore.patrol = new Patrol(patrolSettings);
    appStore.patrol.beginPatrol();
  }
}

// implement defaultProps?
