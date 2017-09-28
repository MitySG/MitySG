import React from 'react';

const TripInfo = props => (
  <div>
    <div>Bus Service No: {props.trip.bus}</div>
    <div>From: {props.startStop}</div>
    <div>To: {props.endStop}</div>
    <div>Time before notification: {props.trip.timeBeforeArrivalToNotify}min</div>
  </div>
);

export default TripInfo;
