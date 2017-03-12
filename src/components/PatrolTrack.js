import React from 'react';
import { inject, observer } from 'mobx-react';
import { TravelBox } from '../components'
import { If } from '../lib'
import css from './PatrolTrack.css'

export default inject("appStore")(observer(({appStore}) => {
  const patrol = appStore.patrol;
  let travelBoxes = patrol.assignment.travelBoxes.map((box, index) =>
    <TravelBox box={box} key={index} showSelection={true}/>
  );

  const indexOfCurrentBox = patrol.assignment.travelBoxes.indexOf(patrol.currentTravelBox);
  let previousBox = indexOfCurrentBox > 0 ? patrol.assignment.travelBoxes[indexOfCurrentBox - 1] : null;
  let nextBox = indexOfCurrentBox <= patrol.assignment.travelBoxes.length ?  patrol.assignment.travelBoxes[indexOfCurrentBox + 1] : null;

  if (previousBox == null)
    previousBox = { displayName: patrol.base };
  if (nextBox == null)
    nextBox = { displayName: patrol.base };

  return (
    <div className={css.track + " row align-items-center"}>
      <div className={css.previous + " col"}>
        {previousBox.displayName}
      </div>

      <div className={css.current + " col-6"}>
        {patrol.currentTravelBox.displayName}
      </div>

      <div className={css.next + " col"}>
        {nextBox.displayName}
      </div>
    </div>
  );
}))
