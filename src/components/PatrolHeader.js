import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

export default inject("appStore")(observer(({appStore}) => {
  const patrol = appStore.patrol;

  return (
    <div>
      <h2>USS { patrol.shipName }</h2>
      <div>Start Date: { patrol.startDate }</div>
    </div>
  );
}))
