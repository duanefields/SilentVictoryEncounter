import React from 'react';
import { inject, observer } from 'mobx-react';
import css from './RandomEvent.css'

export default inject("appStore")(observer(({appStore}) => {
  const patrol = appStore.patrol;
  const event = appStore.patrol.currentEncounter.event;

  return (
    <div className={css.event}>
      <div className="text-center">
        <h1>{event.title}</h1>
        <p>
          {event.text}
        </p>
      </div>

      <div className="text-center row">
        <div className={ css.button + " offset-2 col-8" }>
          <button className="btn btn-primary btn-block" onClick={patrol.clearCurrentEncounter}>
            Continue Patrol
          </button>
        </div>
      </div>
    </div>
  );
}))
