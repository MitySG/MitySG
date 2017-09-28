import React from 'react';
import { ListItem } from 'material-ui/List';
import './Journey.css';

const API_KEY = 'AIzaSyA2AhaWAntXpasV6qrmiugcvBwaXDIyAls';

const Favourites = props => (
  <div>
    { !props.currentTrip ? <span styleName="label">You have not started a journey</span> :
      <ListItem
      primaryText={props.currentTrip.bus}
      secondaryText={`${props.startStop} => ${props.endStop}`}
    />
    }
    <div styleName="map">
      <iframe
        styleName="mapframe"
        title="Google Maps"
        width="100%"
        height="400"
        frameBorder="0"
        src={`https://www.google.com/maps/embed/v1/directions?key=${API_KEY}` +
             `&origin=${props.startStop}&destination=${props.endStop}` +
             '&mode=transit'}
        allowFullScreen
      />
    </div>
  </div>
);

export default Favourites;
