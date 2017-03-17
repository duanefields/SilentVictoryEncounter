import React from 'react';
import { inject, observer } from 'mobx-react';
import { If } from '../lib';
import { Aircraft, NavalContact, Modifiers } from '../components';
import moment from 'moment';

export default inject("appStore")(observer(({appStore}) => {
  const patrol = appStore.patrol;
  const encounter = patrol != null ? patrol.currentEncounter : null;

  let escortContacts = encounter.contacts.map((contact) => {
      if (contact.entryType === 'Escort')
        return <NavalContact contact={contact} key={contact.entryName} />
      else
        return null;
    }
  );

  let otherContacts = encounter.contacts.map((contact) => {
      if (contact.entryType === 'Escort' || contact.entryType === 'Aircraft')
        return null;
      else
        return <NavalContact contact={contact} key={contact.entryName} />
    }
  );

  return (
    <div className="text-center">

      <If cond={encounter.encounterType !== "-"}>
        <div>
          <h2>
            { moment(patrol.currentDate).format("dddd MMMM D, YYYY")}
          </h2>

          <div>
            { moment(patrol.currentDate).format("HH:mm")}
            <If cond={patrol.isNight}>
              <span>&nbsp;(Night)</span>
            </If>
            <If cond={!patrol.isNight}>
              <span>&nbsp;(Day)</span>
            </If>
          </div>

          <div>
            Weather: {encounter.weather.description}
            <If cond={encounter.surprised}>
              <span>You were suprised in the fog!</span>
            </If>
          </div>

          <div>
            { encounter.encounterType }
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
            <div className="row justify-content-center">
              <Aircraft contact={encounter.contacts[0]}/>
            </div>
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
