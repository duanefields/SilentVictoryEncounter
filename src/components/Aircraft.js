import React from 'react';
import { inject, observer } from 'mobx-react';
import { If } from '../lib'

export default inject("appStore")(observer(({appStore, contact}) => {
  const patrol = appStore.patrol;
  let style = { border: "solid 1px black", margin: "1em"};

  return (
    <div className="card col-md-2" style={style}>
      <div className="card-block">
        <div>Aircraft</div>
        <div>{contact.name}</div>
        <div>"{contact.codeName}"</div>
        <div>({contact.quality} Crew)</div>
      </div>

      <div>
        Roll on Aircraft Encounter Chart [A1]
      </div>
    </div>
  );
}))
