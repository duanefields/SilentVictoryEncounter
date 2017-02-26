import React from 'react';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';
import { If } from '../lib'

export default inject("appStore")(observer(({appStore, box}) => {
  const patrol = appStore.patrol;
  const isCurrentLocation = box === patrol.currentTravelBox;
  const buttonClassNames = classNames("btn", "btn-secondary", {active: isCurrentLocation});

  return (
    <button className={buttonClassNames} onClick={() => patrol.moveToTravelBox(box)}>
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
