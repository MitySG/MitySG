import { connect } from 'react-redux';
import Search from './Search';
import { addToFavourites } from '../actions';

const mapStateToProps = state => ({
  buses: state.buses,
  busStops: state.busStops,
});

export default connect(
  mapStateToProps,
  { addToFavourites },
)(Search);
