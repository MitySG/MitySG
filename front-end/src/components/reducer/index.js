import { combineReducers } from 'redux';
import buses from '../buses/reducers/buses';
import busStops from '../buses/reducers/busStops';
import favourites from '../favourites/reducers/favourites';

const reducer = combineReducers({
  buses,
  busStops,
  favourites,
});

export default reducer;
