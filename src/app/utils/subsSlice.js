import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  // { route: 'first/route' },
  // { route: 'second/route' },
];

const subsSlice = createSlice({
  name: 'subs',
  initialState,
  reducers: {
    subAdded(state, action) {
      state.push(action.payload);
    },
    subRemoved(state, action) {
      const { route } = action.payload;
      return state.filter((item) => item.route !== route);
    },
  },
});

export const { subAdded, subRemoved } = subsSlice.actions;

export default subsSlice.reducer;
