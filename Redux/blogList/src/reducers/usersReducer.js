import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setAllUsers(state, action) {
      return action.payload;
    }
  }
});

export const { setAllUsers } = usersSlice.actions;
export default usersSlice.reducer;