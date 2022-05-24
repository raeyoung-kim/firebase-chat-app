import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  info: null,
  isLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.info = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
