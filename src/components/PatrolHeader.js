import React from 'react';
import { inject, observer } from 'mobx-react';
import { If } from '../lib'

export default inject("appStore")(observer(({appStore}) => {
  const patrol = appStore.patrol;
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div>
      <h2>USS { patrol.shipName }</h2>
      <h3>
        <span>{ patrol.assignment.name}</span>
        <If cond={patrol.assignment.isMission}>
          <span>&nbsp;({patrol.assignment.missionName})</span>
        </If>
      </h3>

      <div>
        { monthNames[patrol.startDate.getMonth()] }, { patrol.startDate.getFullYear() } &mdash;&nbsp;
        { monthNames[patrol.endDate.getMonth()] }, { patrol.endDate.getFullYear() }
      </div>
    </div>
  );
}))
