import React from 'react';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';
import { If } from '../lib'

export default inject("appStore")(observer(({appStore, contact}) => {
  const patrol = appStore.patrol;
  let style = { border: "solid 1px black", margin: "1em"};

  return (
    <div className="card col-md-4" style={style}>
      <div className="card-block">
        <div>{contact.type} ({contact.entryType})</div>
        <If cond={contact.image}>
          <img src={contact.image} className="img-fluid"/>
        </If>
        <div>{contact.name}</div>
        <div>{contact.tonnage.toLocaleString()} tons</div>
        <div>{contact.damageRequired} damage</div>
        <If cond={contact.entryType === "Escort"}>
          <div>({contact.quality} Crew)</div>
        </If>
      </div>
    </div>
  );
}))
