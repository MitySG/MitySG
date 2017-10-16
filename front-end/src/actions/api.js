import push from '../push';

const API_BASE_URL = 'https://mityserver.tk/';

const parseResponseBody = (response) => {
  const contentType = response.headers.get('Content-Type');

  if (!contentType) {
    return response.text();
  }

  return response.json();
};

const processResponse = (response) => {
  if (response.ok) {
    return parseResponseBody(response);
  }

  return parseResponseBody(response)
    .then(body => Promise.reject({
      body,
      status: response.status,
    }));
};

const get = path => fetch(API_BASE_URL + path).then(processResponse);

const [post] = ['POST'].map(method =>
  (path, payload) => fetch(API_BASE_URL + path, {
    method,
    body: JSON.stringify(payload),
  }).then(processResponse),
);

export default {
  getBuses: () => get('busServices'),
  getBusStops: () => get('busStops'),
  getBusArrival: (start, end) => {
    console.log('getting bus arrival', start, end);
    return get(`busTiming/${start.latitude},${start.longitude}/${end.latitude},${end.longitude}/`);
  },
  getTrainArrival: (start, end) => {
    console.log('getting train arrival', start, end);
    return get(`trainTiming/${start}/${end}`);
  },
  startBusTrip: ({ bus, start, end, timeBeforeArrivalToNotify }) => push.subscribe(subscription =>
    post(`busTracker/${bus}?start=${start}&end=${end}&alert=${timeBeforeArrivalToNotify}`, subscription.toJSON())),
  startTrainTrip: ({ start, end, timeBeforeArrivalToNotify }) => push.subscribe(subscription =>
    post(`trainTracker/${start}/${end}?alert=${timeBeforeArrivalToNotify}`, subscription.toJSON())),
  getTrainStations: () => get('trainStations'),
};
