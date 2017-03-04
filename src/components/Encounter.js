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
      <div>
        {encounter.time}
        <If cond={encounter.isNight}>
          <span>(Night)</span>
        </If>
        <If cond={!encounter.isNight}>
          <span>(Day)</span>
        </If>
      </div>
      <div>
        Weather: {encounter.weather}
        <If cond={encounter.surprised}>
          <div>You were suprised in the fog!</div>
        </If>
      </div>
      <If cond={encounter.isNaval}>
        <div className="row justify-content-center">
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
