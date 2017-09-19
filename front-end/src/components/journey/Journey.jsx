import React from 'react';
import { ListItem } from 'material-ui/List';

const API_KEY = 'AIzaSyA2AhaWAntXpasV6qrmiugcvBwaXDIyAls';

const Favourites = ({ favourites, busStops, currentTrip }) => (
  <div>
    { !currentTrip ? 'You have not started a journey' :
    <ListItem
      primaryText={currentTrip.bus}
      secondaryText={`${busStops[currentTrip.start].description} => ${busStops[currentTrip.end].description}`}
    />
    }

    <iframe
      title="Google Maps"
      width="100%"
      height="600"
      frameBorder="0"
      src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=41.40338, 2.17403`}
      allowFullScreen
    />
  </div>
);

export default Favourites;
