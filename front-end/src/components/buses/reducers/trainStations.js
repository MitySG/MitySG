
const trainStations = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_TRAIN_STATIONS':
      return action.trainStations;
    default:
      return state;
  }
};

export default trainStations;
