import { combineReducers } from 'redux';
import buses from '../buses/reducers/buses';
import busStops from '../buses/reducers/busStops';
import favourites from '../favourites/reducers/favourites';
import slideIndex from './slideIndex';

const reducer = combineReducers({
  buses,
  busStops,
  favourites,
  slideIndex,
});

export default reducer;
