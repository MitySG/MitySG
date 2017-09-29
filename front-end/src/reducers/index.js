import { combineReducers } from 'redux';
import buses from './buses';
import trainStations from './trainStations';
import busStops from './busStops';
import favourites from '../components/favourites/reducers/favourites';
import slideIndex from './slideIndex';
import notificationValue from './notificationValue';
import currentTrip from './currentTrip';
import eta from './eta';
import currentCoords from '../components/journey/reducers/currentCoords';
import nearestStop from '../components/journey/reducers/nearestStop';

const reducer = combineReducers({
  buses,
  busStops,
  favourites,
  slideIndex,
  notificationValue,
  currentTrip,
  trainStations,
  eta,
  currentCoords,
  nearestStop,
});

export default reducer;
