
const favourites = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_FAVOURITES': {
      const stringifiedFavourite = JSON.stringify(action.favourite);
      return [
        action.favourite,
        ...state.filter(favourite => JSON.stringify(favourite) !== stringifiedFavourite),
      ];
    }
    case 'REMOVE_FROM_FAVOURITES':
      return state.filter(favourite => JSON.stringify(favourite) !== action.favouriteStringified);
    default:
      return state;
  }
};

export default favourites;
