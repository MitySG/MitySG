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
  getBusArrival: (start, end) => get(`busTiming/${start.latitude},${start.longitude}/${end.latitude},${end.longitude}/`),
  getTrainArrival: (start, end) => get(`trainTiming/${start}/${end}`),
  startBusTrip: ({ bus, start, stop, timeBeforeArrivalToNotify }) => push.subscribe(subscription =>
    post(`busTracker/${bus}?start=${start}&end=${stop}&alert=${timeBeforeArrivalToNotify}`, subscription.toJSON())),
  startTrainTrip: ({ start, stop, timeBeforeArrivalToNotify }) => push.subscribe(subscription =>
    post(`trainTracker/${start}/${stop}?alert=${timeBeforeArrivalToNotify}`, subscription.toJSON())),
  getTrainStations: () => get('trainStations'),
};
