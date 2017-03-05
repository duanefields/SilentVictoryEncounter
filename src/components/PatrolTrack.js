import React from 'react';
import { inject, observer } from 'mobx-react';
import { TravelBox } from '../components'
import { If } from '../lib'

export default inject("appStore")(observer(({appStore}) => {
  const patrol = appStore.patrol;
  let travelBoxes = patrol.assignment.travelBoxes.map((box, index) =>
    <TravelBox box={box} key={index} showSelection={true}/>
  );

  return (
    <div className="text-center">
      <div className="btn-group hidden-md-down">
        {travelBoxes}
      </div>

      <If cond={patrol.currentTravelBox}>
        <div className="hidden-lg-up">
          <TravelBox box={patrol.currentTravelBox} />
        </div>
      </If>
    </div>
  );
}))
