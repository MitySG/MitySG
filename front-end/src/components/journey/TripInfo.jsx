import React from 'react';
import './TripInfo.css';

const TripInfo = props => (
  <div>
    {props.trip.bus
      ?
      <div>
        Bus Service No: <span styleName="names">{props.trip.bus}</span>
        </div>
      :
        <div>
        MRT
      </div>
    }
    <div>
      From: <span styleName="names">{props.startStop}</span>
    </div>
    <div>
      To: <span styleName="names">{props.endStop}</span>
    </div>
    <div>
      Notify before: <span styleName="names">{props.trip.timeBeforeArrivalToNotify} min</span>
    </div>
  </div>
);

export default TripInfo;
