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
    resetConnectionStatus() {
      return initialState;
    },
  },
});

export const { updateConnectionStatus, resetConnectionStatus } = connectionStatusSlice.actions;

export default connectionStatusSlice.reducer;
