import { connect } from 'react-redux';
import Journey from './Journey';

const mapStateToProps = state => ({
  currentTrip: state.currentTrip,
  startStop: state.currentTrip.bus
    ? (state.busStops[(state.currentTrip || {}).start] || {}).description
    : state.currentTrip.start,
  endStop: state.currentTrip.bus
    ? (state.busStops[(state.currentTrip || {}).end] || {}).description
    : state.currentTrip.end,
});

export default connect(
  mapStateToProps,
)(Journey);
