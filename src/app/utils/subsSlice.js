import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { route: 'first/route' },
  { route: 'second/route' },
];

const subsSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    subAdded(state, action) {
      state.push(action.payload);
    },
  },
});

export const { subAdded } = subsSlice.actions;

export default subsSlice.reducer;
