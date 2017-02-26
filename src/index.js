import React from 'react';
import ReactDOM from 'react-dom';
import { App, PatrolView, AboutView } from './views';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router'
import './styles/index.styl';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="/patrol"/>
      <Route path="/patrol" component={PatrolView}/>
      <Route path="/about" component={AboutView}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
