import { connect } from 'react-redux';
import Journey from './Journey';
import { getBusArrival, getTrainArrival } from '../../actions';

const mapStateToProps = state => ({
  currentTrip: state.currentTrip,
  startStop: state.currentTrip.bus
    ? state.busStops[(state.currentTrip || {}).start]
    : state.currentTrip.start,
  endStop: state.currentTrip.bus
    ? state.busStops[(state.currentTrip || {}).end]
    : state.currentTrip.end,
  trainStations: state.trainStations,
  eta: state.eta,
});

export default connect(
  mapStateToProps,
  { getBusArrival, getTrainArrival },
)(Journey);
