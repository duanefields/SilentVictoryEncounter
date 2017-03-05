import React from 'react';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';
import { If } from '../lib'

export default inject("appStore")(observer(({appStore, box, showSelection=false}) => {
  const patrol = appStore.patrol;
  const isCurrentLocation = box === patrol.currentTravelBox;
  const buttonClassNames = classNames("btn", "btn-secondary", {active: isCurrentLocation && showSelection});

  return (
    <button className={buttonClassNames}>
      {box.displayName}

      <If cond={box.isMissionBox}>
        <span>
          <br/>
          (Mission)
        </span>
      </If>

      <If cond={box.times > 1}>
        <span>
          <br/>
          × {box.times}
        </span>
      </If>
    </button>
  );
}))
