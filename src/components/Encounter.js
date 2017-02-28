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
      <If cond={encounter.isNaval}>
        <div>
          {contacts}
        </div>
      </If>
      <If cond={encounter.encounterType === "-"}>
        <span>No Contacts</span>
      </If>
      <If cond={encounter.encounterType === "Aircraft"}>
        <span>Aircraft</span>
      </If>
      <If cond={encounter.encounterType === "Minefield"}>
        <span>Minefield</span>
      </If>
    </div>
  );
}))
