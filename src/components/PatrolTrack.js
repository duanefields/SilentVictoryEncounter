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
  const previousBox = indexOfCurrentBox > 0 ? patrol.assignment.travelBoxes[indexOfCurrentBox - 1] : null;
  const nextBox = indexOfCurrentBox <= patrol.assignment.travelBoxes.length ?  patrol.assignment.travelBoxes[indexOfCurrentBox + 1] : null;

  return (
    <div className="text-center">
      <div>
        {previousBox &&
          <span className={css.previous}>{previousBox.displayName}</span>
        }

        <strong className={css.current}>{patrol.currentTravelBox.displayName}</strong>

        {nextBox &&
          <span className={css.next}>{nextBox.displayName}</span>
        }
      </div>
    </div>
  );
}))
