
const currentCoords = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_COORDS': {
      return action.coords;
    }
    default:
      return state;
  }
};

export default currentCoords;
