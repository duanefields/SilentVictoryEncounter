import React from 'react';
import { Route, BrowserRouter, Redirect } from 'react-router-dom'
import { App, PatrolView, AboutView } from './views';

const Routes = () => {
  return (
    <BrowserRouter>
      <Redirect from="/" to="/patrol"/>
      <Route path="/">
        <App>
          <Route path="/patrol" component={PatrolView}/>
          <Route path="/about" component={AboutView}/>
        </App>
      </Route>
    </BrowserRouter>
  );
}

export default Routes;
