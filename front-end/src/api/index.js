import buses from './buses.json';
import busStops from './busStops.json';

export default {
  getBuses: () => Promise.resolve(buses),
  getBusStops: () => Promise.resolve(busStops),
};
