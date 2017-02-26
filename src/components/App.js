import React, { Component } from 'react';
import { Link } from 'react-router';
import { NavLink } from '../components';

export default class App extends Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-toggleable-sm navbar-light bg-faded">
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
            <span className="navbar-toggler-icon"></span>
          </button>

          <Link className="navbar-brand" to="/">Silent Victory Encounter Aid</Link>

          <div id="navbarSupportedContent" className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to="/patrol">Patrol</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about">About</NavLink>
              </li>
            </ul>
          </div>
        </nav>
        {this.props.children}
      </div>
    );
  }
}
