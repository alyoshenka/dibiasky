import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  // { route: 'dummyRoute', msg: 'something happened' },
  // { route: 'differentRoute', msg: 'another thing happened' },
  // 'thing',
  // 'another thing',
];

const logSlice = createSlice({
  name: 'log',
  initialState,
  reducers: {
    logAdded(state, action) {
      state.push(action.payload);
    },
    resetLog() {
      return initialState;
    },
  },
});

export const { logAdded, resetLog } = logSlice.actions;

export default logSlice.reducer;
