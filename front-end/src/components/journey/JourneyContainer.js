import { connect } from 'react-redux';
import Journey from './Journey';

const mapStateToProps = state => ({
  favourites: state.favourites,
  busStops: state.busStops,
  currentTrip: state.currentTrip,
});

export default connect(
  mapStateToProps,
)(Journey);
