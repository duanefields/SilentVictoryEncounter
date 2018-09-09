import React from 'react';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';

export default inject("appStore")(observer(({appStore, box, showSelection=false}) => {
  const patrol = appStore.patrol;
  const sjRadarClassNames = classNames(
    "form-check", "form-check-inline",
    {"disabled": !patrol.SJRadarAvailable}
  );

  return (
    <form>
      <div className="form-check form-check-inline">
        <label className="form-check-label">
          <input className="form-check-input" type="checkbox"
            checked={patrol.SDRadarOperational}
            onChange={patrol.toggleSDRadarOperational}
          /> SD Radar
        </label>
      </div>

      <div className={sjRadarClassNames}>
        <label className="form-check-label">
          <input className="form-check-input" type="checkbox"             checked={patrol.SJRadarOperational}
          disabled={!patrol.SJRadarAvailable}
          onChange={patrol.toggleSJRadarOperational}
          /> SJ Radar
        </label>
      </div>

      <div className="form-check form-check-inline">
        <label className="form-check-label">
          <input className="form-check-input" type="checkbox"
            checked={patrol.closeApproachConvoys}
            onChange={patrol.toggleCloseApproachConvoys}
          /> Close Range Convoys
        </label>
      </div>
    </form>
  );
}))
