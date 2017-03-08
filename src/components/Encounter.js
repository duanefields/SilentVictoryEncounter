import React from 'react';
import { inject, observer } from 'mobx-react';
import { If } from '../lib'
import { Contact, Modifiers } from '../components'

export default inject("appStore")(observer(({appStore}) => {
  const patrol = appStore.patrol;
  const encounter = patrol != null ? patrol.currentEncounter : null;

  let escortContacts = encounter.contacts.map((contact) => {
      if (contact.entryType !== 'Escort')
        return null;
      else
        return <Contact contact={contact} key={contact.entryName} />
    }
  );

  let otherContacts = encounter.contacts.map((contact) => {
      if (contact.entryType === 'Escort')
        return null;
      else
        return <Contact contact={contact} key={contact.entryName} />
    }
  );

  return (
    <div className="text-center">

      <If cond={encounter.encounterType !== "-"}>
        <div>
          <div>
            { encounter.encounterType }
          </div>

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
            Weather: {encounter.weather.description}
            <If cond={encounter.surprised}>
              <span>You were suprised in the fog!</span>
            </If>
          </div>

          <If cond={encounter.isNaval}>
            <div>
              <div className="row justify-content-center">
                {escortContacts}
              </div>
              <div className="row justify-content-center">
                {otherContacts}
              </div>
            </div>
          </If>

          <If cond={encounter.encounterType === "Aircraft"}>
            <span>Aircraft</span>
          </If>

          <If cond={encounter.encounterType === "Minefield"}>
            <span>Minefield</span>
          </If>

          <Modifiers />
        </div>
      </If>

      <If cond={encounter.encounterType === "-"}>
        <span>No Contacts</span>
      </If>

    </div>
  );
}))
