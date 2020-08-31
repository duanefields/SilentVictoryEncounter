import React from 'react';
import { Route, HashRouter, Redirect } from 'react-router-dom'
import { App, PatrolView, AboutView } from './views';



const Routes = () => {
  return (
    <HashRouter>
      <Route path="/" component={App}>
        <Redirect from="/" to="/patrol"/>
        <Route path="/patrol" component={PatrolView}/>
        <Route path="/about" component={AboutView}/>
      </Route>
    </HashRouter>
  );
}

export default Routes;
