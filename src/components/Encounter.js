import React from 'react';
import { inject, observer } from 'mobx-react';

export default inject("appStore")(observer(({appStore}) => {
  const patrol = appStore.patrol;
  const encounter = patrol.currentEncounter;

  return (
    <div className="text-center">
      {encounter}
    </div>
  );
}))
