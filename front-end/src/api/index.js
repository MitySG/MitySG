import push from '../push';

const API_BASE_URL = 'https://mityserver.tk/';

const get = path => fetch(API_BASE_URL + path).then(response => response.json());

const [post] = ['POST'].map(method =>
  (path, payload) => fetch(API_BASE_URL + path, {
    method,
    body: JSON.stringify(payload),
  }).then(response => response.json()),
);

export default {
  getBuses: () => get('busServices'),
  getBusStops: () => get('busStops'),
  startBusTrip: ({ bus, start, stop, timeBeforeArrivalToNotify }) =>
    post(`busTracker/${bus}?start=${start}&end=${stop}&alert=${timeBeforeArrivalToNotify}`, push.subscribe()),
  getTrainStations: () => get('trainStations'),
};
