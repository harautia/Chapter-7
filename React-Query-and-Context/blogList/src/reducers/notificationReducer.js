const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_INFO':
      console.log('Notification Reducer SHOW_INFO');
      return {
        message: action.payload,
        type: 'info'
      };
      
    case 'SHOW_ERROR':
      console.log('Notification Reducer SHOW_ERROR');
      return {
        message: action.payload,
        type: 'error'
      };
      
    case 'HIDE':
      console.log('Notification Reducer HIDE');
      return {
        message: null,
        type: null
      };
      
    default:
      return state;
  }
};

export default notificationReducer;