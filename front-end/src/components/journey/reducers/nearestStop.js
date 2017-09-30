
const nearestStop = (state = {}, action) => {
  switch (action.type) {
    case 'SET_NEAREST_STOP': {
      return {
        bus: action.bus,
        mrt: action.mrt,
      };
    }
    default:
      return state;
  }
};

export default nearestStop;
