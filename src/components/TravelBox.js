import React from 'react';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';

export default inject("appStore")(observer(({appStore, box}) => {
  const patrol = appStore.patrol;
  const isCurrentLocation = box === patrol.currentTravelBox;
  const buttonClassNames = classNames("btn", "btn-secondary", {active: isCurrentLocation});

  return (
    <button className={buttonClassNames} onClick={() => patrol.moveToTravelBox(box)}>
      {box.name}
    </button>
  );
}))
