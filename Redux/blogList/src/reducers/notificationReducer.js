import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  visible: false,
  type: null  // 'error' or 'info'
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    displayNotification(state, action) {
      state.message = action.payload.message
      state.visible = true
      state.type = action.payload.type
    },
    hideNotification(state) {
      state.visible = false;
    }
  },
});


const { displayNotification, hideNotification } = notificationSlice.actions;

export const setNotification = (message, type, duration) => {
  return async dispatch => {
    dispatch(displayNotification({ message, type }))
    setTimeout(() => {
      dispatch(hideNotification())
    }, duration * 1000)
  }
};

export default notificationSlice.reducer;