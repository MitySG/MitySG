
const notificationValue = (state = 3, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION_VALUE':
      return action.value;
    default:
      return state;
  }
};

export default notificationValue;
