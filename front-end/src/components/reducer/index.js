import { combineReducers } from 'redux';
import buses from '../buses/reducer/buses';

const reducer = combineReducers({
  buses,
});

export default reducer;
