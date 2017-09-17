
const favourites = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_FAVOURITES':
      return [
        ...state,
        { bus: action.bus, start: action.start, end: action.end },
      ];
    default:
      return state;
  }
};

export default favourites;
