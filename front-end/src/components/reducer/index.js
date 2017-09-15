import { combineReducers } from 'redux';
import buses from '../buses/reducer/buses';
import busStops from '../buses/reducer/busStops';

const reducer = combineReducers({
  buses,
  busStops,
});

export default reducer;
