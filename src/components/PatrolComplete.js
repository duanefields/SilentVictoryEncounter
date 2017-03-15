import React from 'react';
import { inject, observer } from 'mobx-react';

export default inject("appStore")(observer(({appStore}) => {
  const patrol = appStore.patrol;
  return (
    <div className="text-center">
      <h1>Patrol Complete</h1>
      <h2>Welcome back to {patrol.base}</h2>
      <button className="btn btn-primary" onClick={patrol.newPatrol}>
        Begin New Patrol
      </button>
    </div>
  );
}))
