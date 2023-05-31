import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { connectionStatus: null, isConnected: false },
];

const connectionStatusSlice = createSlice({
  name: 'connectionStatus',
  initialState,
  reducers: {
    updateConnectionStatus(state, action) {
      const { connectionStatus } = action;
      const isConnected = connectionStatus === 'Connected';
      return {
        ...state,
        connectionStatus,
        isConnected,
      };
    },
  },
});

export const { updateConnectionStatus } = connectionStatusSlice.actions;

export default connectionStatusSlice.reducer;
