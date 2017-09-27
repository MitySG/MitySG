const API_BASE_URL = 'https://mityserver.tk/';

const [get, post] = ['GET', 'POST'].map(method =>
  path => fetch(API_BASE_URL + path, {
    method,
  }).then(response => response.json()),
);

export default {
  getBuses: () => get('busServices'),
  getBusStops: () => get('busStops'),
};
