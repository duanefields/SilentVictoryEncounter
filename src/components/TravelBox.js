import React from 'react';
import { inject, observer } from 'mobx-react';

export default inject("appStore")(observer(({appStore, box}) => {
  return (
    <button className="btn btn-secondary">
      {box.name}
    </button>
  );
}))
