import buses from './buses.json';

export default {
  getBuses: () => Promise.resolve(buses),
};
