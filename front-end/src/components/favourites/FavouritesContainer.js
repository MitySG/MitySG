import { connect } from 'react-redux';
import Favourites from './Favourites';

const mapStateToProps = state => ({
  favourites: state.favourites,
  busStops: state.busStops,
});

export default connect(
  mapStateToProps,
)(Favourites);
