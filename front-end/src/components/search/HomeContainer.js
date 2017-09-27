import { connect } from 'react-redux';
import Home from './Home';
import { addToFavourites, setSlideIndex, setCurrentTrip, setNotificationValue } from '../../actions';

const mapStateToProps = state => ({
  buses: state.buses,
  busStops: state.busStops,
  notificationValue: state.notificationValue,
});

export default connect(
  mapStateToProps,
  { addToFavourites, setSlideIndex, setCurrentTrip, setNotificationValue },
)(Home);
