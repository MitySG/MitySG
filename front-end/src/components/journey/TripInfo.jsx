import React from 'react';
import './TripInfo.css';

const TripInfo = props => (
  <div>

    <div styleName="text">
      {!props.trip.bus ?
        <div>MRT</div>
        :
        <div>
          Bus Service No: <span styleName="names">{props.trip.bus}</span>
        </div>
      }
    </div>
    <div styleName="text">
      From: <span styleName="names">{props.startStop}</span>
    </div>
    <div styleName="text">
      To: <span styleName="names">{props.endStop}</span>
    </div>
    <div styleName="text">
      Notify before: <span styleName="names">{props.trip.timeBeforeArrivalToNotify} min</span>
    </div>
  </div>
);

export default TripInfo;
