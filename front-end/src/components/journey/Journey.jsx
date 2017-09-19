import React from 'react';

const API_KEY = 'AIzaSyA2AhaWAntXpasV6qrmiugcvBwaXDIyAls';

const Favourites = ({ favourites, busStops }) => (
  <iframe
    title="Google Maps"
    width="100%"
    height="600"
    frameBorder="0"
    src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=41.40338, 2.17403`}
    allowFullScreen
  />
);

export default Favourites;
