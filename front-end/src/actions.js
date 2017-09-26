import api from './api';

export const getBuses = (dispatch) => {
  api.getBuses().then((buses) => {
    dispatch({
      type: 'RECEIVE_BUSES',
      buses,
    });
  }).catch(err => console.log(err));
};

export const getBusStops = (dispatch) => {
  api.getBusStops().then((busStops) => {
    dispatch({
      type: 'RECEIEVE_BUS_STOPS',
      busStops,
    });
  }).catch(err => console.log(err));
};

export const addToFavourites = ({ bus, start, end }) => ({
  type: 'ADD_TO_FAVOURITES',
  bus,
  start,
  end,
});

export const removeFromFavourites = favouriteStringified => ({
  type: 'REMOVE_FROM_FAVOURITES',
  favouriteStringified,
});

export const setSlideIndex = slideIndex => ({
  type: 'SET_SLIDE_INDEX',
  slideIndex,
});

export const setCurrentTrip = currentTrip => ({
  type: 'SET_CURRENT_TRIP',
  currentTrip,
});
