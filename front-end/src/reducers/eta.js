
const eta = (state = null, action) => {
  switch (action.type) {
    case 'SET_ETA':
      return action.eta;
    default:
      return state;
  }
};

export default eta;
