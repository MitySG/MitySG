import { connect } from 'react-redux';
import Home from './Home';
import { addToFavourites, removeFromFavourites, setSlideIndex, setCurrentTrip, setNotificationValue } from '../../actions';

const mapStateToProps = state => ({
  buses: state.buses,
  busStops: state.busStops,
  notificationValue: state.notificationValue,
  trainStations: state.trainStations,
});

export default connect(
  mapStateToProps,
  { addToFavourites, removeFromFavourites, setSlideIndex, setCurrentTrip, setNotificationValue },
)(Home);
