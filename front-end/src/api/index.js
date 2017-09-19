import buses from './buses.json';
import busStops from './busStops.json';

// const [get, post] = ['GET', 'POST'].map(method =>
//   path => fetch(process.env.REACT_APP_API_BASE_URL + path, {
//     headers: { 'Content-Type': 'application/json' },
//     method,
//   }).then((response) => { console.log(response); return response.json(); })
//     .catch(err => console.log(err)),
// );

// https://zihgyx1zp8.execute-api.ap-southeast-1.amazonaws.com/prod/BusServices
// https://q5nyw1vwna.execute-api.ap-southeast-1.amazonaws.com/prod/BusStops

export default {
  getBuses: () => Promise.resolve(buses),
  getBusStops: () => Promise.resolve(busStops),
};
