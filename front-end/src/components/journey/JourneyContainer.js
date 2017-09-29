import { connect } from 'react-redux';
import Journey from './Journey';
import { getBusArrival, getTrainArrival, setCurrentTrip, setCurrentCoords, setNearestStop } from '../../actions';

const mapStateToProps = state => ({
  currentTrip: state.currentTrip,
  startStop: (state.currentTrip || {}).bus
    ? state.busStops[(state.currentTrip || {}).start]
    : (state.currentTrip || {}).start,
  endStop: (state.currentTrip || {}).bus
    ? state.busStops[(state.currentTrip || {}).end]
    : (state.currentTrip || {}).end,
  trainStations: state.trainStations,
  busStops: state.busStops,
  eta: state.eta,
  currentCoords: state.currentCoords,
  nearestStop: state.nearestStop,
});

export default connect(
  mapStateToProps,
  { getBusArrival, getTrainArrival, setCurrentTrip, setCurrentCoords, setNearestStop },
)(Journey);
