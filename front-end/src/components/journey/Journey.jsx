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

    <iframe
      title="Google Maps"
      width="100%"
      height="600"
      frameBorder="0"
      src={`https://www.google.com/maps/embed/v1/directions?key=${API_KEY}` +
           `&origin=${props.startStop}` +
           `&destination=${props.endStop}`}
      allowFullScreen
    />
  </div>
);

export default Favourites;
