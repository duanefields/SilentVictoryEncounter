import React from 'react';
import { inject, observer } from 'mobx-react';

export default inject("appStore")(observer(({appStore}) => {
  const patrol = appStore.patrol;
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div>
      <h2>USS { patrol.shipName }</h2>
      <div>
        { monthNames[patrol.startDate.getMonth()] }, { patrol.startDate.getFullYear() } &mdash;&nbsp;
        { monthNames[patrol.endDate.getMonth()] }, { patrol.endDate.getFullYear() }
      </div>
    </div>
  );
}))
