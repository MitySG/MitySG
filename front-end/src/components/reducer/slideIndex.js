
const slideIndex = (state = 0, action) => {
  switch (action.type) {
    case 'SET_SLIDE_INDEX':
      return action.slideIndex;
    default:
      return state;
  }
};

export default slideIndex;
