
const favourites = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_FAVOURITES':
      return [
        ...state,
        { bus: action.bus, start: action.start, end: action.end },
      ];
    case 'REMOVE_FROM_FAVOURITES':
      return state.filter(favourite => JSON.stringify(favourite) !== action.favouriteStringified);
    default:
      return state;
  }
};

export default favourites;
