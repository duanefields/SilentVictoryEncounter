import React from 'react';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';
import { If } from '../lib'

export default inject("appStore")(observer(({appStore, contact}) => {
  const patrol = appStore.patrol;

  return (
    <div>
      {contact.type}: {contact.name}, {contact.tonnage} tons
    </div>
  );
}))
