import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router'
import { App, PatrolView, AboutView } from './views';

const Routes = () => {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to="/patrol"/>
        <Route path="/patrol" component={PatrolView}/>
        <Route path="/about" component={AboutView}/>
      </Route>
    </Router>
  );
}

export default Routes;
