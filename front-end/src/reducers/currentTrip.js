
const currentTrip = (state = null, action) => {
  switch (action.type) {
    case 'SET_CURRENT_TRIP':
      return action.currentTrip;
    default:
      return state;
  }
};

export default currentTrip;
