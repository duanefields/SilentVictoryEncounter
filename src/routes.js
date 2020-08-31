import React from 'react';
import { Route, HashRouter } from 'react-router-dom'
import { App, PatrolView, AboutView } from './views';



const Routes = () => {
  return (
    <HashRouter>
      <Route path="/" component={App}>
        {/* <IndexRedirect to="/patrol"/> */}
        <Route path="/patrol" component={PatrolView}/>
        <Route path="/about" component={AboutView}/>
      </Route>
    </HashRouter>
  );
}

export default Routes;
