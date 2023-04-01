import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { route: 'dummyRoute', msg: 'something happened' },
  { route: 'differentRoute', msg: 'another thing happened' },
];

const logSlice = createSlice({
  name: 'log',
  initialState,
  reducers: {
    logAdded(state, action) {
      state.push(action.payload);
    },
  },
});

export const { logAdded } = logSlice.actions;

export default logSlice.reducer;
