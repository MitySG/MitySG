const [get, post] = ['GET', 'POST'].map(method =>
  path => fetch(path, {
    method,
  }).then(response => response.json())
    .catch(err => console.log(err)),
);

export default {
  getBuses: () => get('https://zihgyx1zp8.execute-api.ap-southeast-1.amazonaws.com/prod/BusServices'),
  getBusStops: () => get('https://q5nyw1vwna.execute-api.ap-southeast-1.amazonaws.com/prod/BusStops'),
};
