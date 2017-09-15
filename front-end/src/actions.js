import api from './api';

export const getBuses = (dispatch) => {
  api.getBuses().then((buses) => {
    dispatch({
      type: 'RECEIVE_BUSES',
      buses,
    });
  });
};

export const getBusStops = (dispatch) => {
  api.getBusStops().then((busStops) => {
    dispatch({
      type: 'RECEIEVE_BUS_STOPS',
      busStops,
    });
  });
};
