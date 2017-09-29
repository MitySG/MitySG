
const nearestStop = (state = 'Unknown', action) => {
  switch (action.type) {
    case 'SET_NEAREST_STOP': {
      return action.stop;
    }
    default:
      return state;
  }
};

export default nearestStop;
