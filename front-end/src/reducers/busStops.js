
const buses = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIEVE_BUS_STOPS':
      return action.busStops;
    default:
      return state;
  }
};

export default buses;
