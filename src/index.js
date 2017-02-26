import React from 'react';
import ReactDOM from 'react-dom';
import { App, Patrol, About } from './components';
import './styles/index.styl';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router'

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="/patrol"/>
      <Route path="/patrol" component={Patrol}/>
      <Route path="/about" component={About}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
