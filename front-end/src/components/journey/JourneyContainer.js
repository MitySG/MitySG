import { connect } from 'react-redux';
import Journey from './Journey';
import { getBusArrival, getTrainArrival, setCurrentTrip, setCurrentCoords,
  setSlideIndex, addToFavourites, removeFromFavourites } from '../../actions';

const mapStateToProps = state => ({
  currentTrip: state.currentTrip,
  trainStations: state.trainStations,
  busStops: state.busStops,
  eta: state.eta,
  currentCoords: state.currentCoords,
  favourites: state.favourites,
});

export default connect(
  mapStateToProps,
  { getBusArrival,
    getTrainArrival,
    setCurrentTrip,
    setCurrentCoords,
    setSlideIndex,
    addToFavourites,
    removeFromFavourites },
)(Journey);
