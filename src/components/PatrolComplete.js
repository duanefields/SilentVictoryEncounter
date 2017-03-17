import React from 'react';
import { inject, observer } from 'mobx-react';

export default inject("appStore")(observer(({appStore}) => {
  const patrol = appStore.patrol;
  return (
    <div className="text-center">
      <h1>Patrol Complete</h1>
      <h2>Welcome back to {patrol.base}</h2>

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
}))
