import { createSlice } from '@reduxjs/toolkit';

const initialState = { connectionState: 'undefined', isConnected: false };

const connectionStatusSlice = createSlice({
  name: 'connectionStatus',
  initialState,
  reducers: {
    updateConnectionStatus(state, action) {
      const connectionState = action.payload;
      const isConnected = connectionState === 'Connected';
      return {
        ...state,
        connectionState,
        isConnected,
      };
    },
  },
});

export const { updateConnectionStatus } = connectionStatusSlice.actions;

export default connectionStatusSlice.reducer;
