import React from 'react';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';
import { If } from '../lib'

export default inject("appStore")(observer(({appStore, contact}) => {
  const patrol = appStore.patrol;
  let style = { border: "solid 1px black", margin: "1em"};

  return (
    <div className="card col-md-2" style={style}>
      <div className="card-block">
        <div>{contact.type} ({contact.entryType})</div>
        <div>{contact.name}</div>
        <div>{contact.tonnage} tons</div>
        <If cond={contact.entryType === "Escort"}>
          <div>({contact.quality} Crew)</div>
        </If>
      </div>
    </div>
  );
}))
