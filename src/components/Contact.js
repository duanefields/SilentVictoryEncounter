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
        {contact.type} ({contact.entryType}): {contact.name}, {contact.tonnage} tons
        <If cond={contact.entryType === "Escort"}>
          <span>({contact.quality} Crew)</span>
        </If>
      </div>
    </div>
  );
}))
