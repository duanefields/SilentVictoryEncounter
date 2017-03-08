import React from 'react';
import { inject, observer } from 'mobx-react';
import { If } from '../lib'

export default inject("appStore")(observer(({appStore}) => {
  const patrol = appStore.patrol;
  const encounter = patrol != null ? patrol.currentEncounter : null;

  return (
    <div>
      <If cond={encounter.weather && encounter.weather.modifier}>
        <span>Weather is { encounter.weather.description }: { encounter.weather.modifier }</span>
      </If>
    </div>
  );
}))
