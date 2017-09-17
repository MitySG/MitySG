import { connect } from 'react-redux';
import Favourites from './Favourites';
import { removeFromFavourites } from '../../actions';

const mapStateToProps = state => ({
  favourites: state.favourites,
  busStops: state.busStops,
});

export default connect(
  mapStateToProps,
  { removeFromFavourites },
)(Favourites);
