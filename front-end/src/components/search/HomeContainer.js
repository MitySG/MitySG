import { connect } from 'react-redux';
import Home from './Home';
import { addToFavourites, setSlideIndex, setCurrentTrip } from '../../actions';

const mapStateToProps = state => ({
  buses: state.buses,
  busStops: state.busStops,
});

export default connect(
  mapStateToProps,
  { addToFavourites, setSlideIndex, setCurrentTrip },
)(Home);
