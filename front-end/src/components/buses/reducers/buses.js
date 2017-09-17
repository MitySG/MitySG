
const buses = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_BUSES':
      return action.buses;
    default:
      return state;
  }
};

export default buses;
