import React from 'react';
import { inject, observer } from 'mobx-react';
import { If } from '../lib'
import { Contact } from '../components'

export default inject("appStore")(observer(({appStore}) => {
  const patrol = appStore.patrol;
  const encounter = patrol != null ? patrol.currentEncounter : null;

  let contacts = encounter.contacts.map((contact) =>
    <Contact contact={contact} key={contact.entryName} />
  );
  console.log(contacts);

  return (
    <div className="text-center">
      <span>{encounter.encounterType}</span>
      <If cond={encounter.contacts.length > 0}>
        <div>
          {contacts}
        </div>
      </If>
      <If cond={encounter.contacts.length === 0}>
        <span>No Contacts</span>
      </If>
    </div>
  );
}))
