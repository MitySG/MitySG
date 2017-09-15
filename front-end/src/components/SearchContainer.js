import { connect } from 'react-redux';
import Search from './Search';

const mapStateToProps = state => ({
  buses: state.buses,
  busStops: state.busStops,
});

export default connect(
  mapStateToProps,
)(Search);
