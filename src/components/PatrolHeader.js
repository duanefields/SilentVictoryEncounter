import React from 'react';
import { inject, observer } from 'mobx-react';
import { If } from '../lib'
import moment from 'moment';;

export default inject("appStore")(observer(({appStore}) => {
  const patrol = appStore.patrol;

  return (
    <div>
      {/* <h2>USS { patrol.shipName }</h2> */}
      <h3>
        <span>{ patrol.assignment.name}</span>
        <If cond={patrol.assignment.isMission}>
          <span>&nbsp;({patrol.assignment.missionName})</span>
        </If>
      </h3>

      <div>
        { moment(patrol.startDate).format("MMMM, YYYY") } &mdash;&nbsp;
        { moment(patrol.endDate).format("MMMM, YYYY") }
      </div>
    </div>
  );
}))
