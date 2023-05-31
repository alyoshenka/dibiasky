import { configureStore } from '@reduxjs/toolkit';

import logReducer from './logSlice';
import subsReducer from './subsSlice';
import connectionStatusReducer from './connectionStatusSlice';

export default configureStore({
  reducer: {
    log: logReducer,
    subs: subsReducer,
    connectionStatus: connectionStatusReducer,
  },
});
