import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { TravelBox } from '../components'

export default inject("appStore")(observer(({appStore}) => {
  const patrol = appStore.patrol;
  let travelBoxes = patrol.assignment.travelBoxes.map((box, index) =>
    <TravelBox box={box} key={index} />
  );

  return (
    <div className="text-center">
      <div className="btn-group text-center">
        {travelBoxes}
      </div>
    </div>
  );
}))
