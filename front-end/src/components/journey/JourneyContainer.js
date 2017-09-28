import { connect } from 'react-redux';
import Journey from './Journey';

const mapStateToProps = state => ({
  currentTrip: state.currentTrip,
  startStop: (state.busStops[(state.currentTrip || {}).start] || {}).description,
  endStop: (state.busStops[(state.currentTrip || {}).end] || {}).description,
});

export default connect(
  mapStateToProps,
)(Journey);
