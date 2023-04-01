import { configureStore } from '@reduxjs/toolkit';

import logReducer from './logSlice';
import subsReducer from './utils/subsSlice';

export default configureStore({
  reducer: {
    log: logReducer,
    subs: subsReducer,
  },
});
