import { configureStore } from '@reduxjs/toolkit';

import logReducer from './logSlice';
import subsReducer from './subsSlice';

export default configureStore({
  reducer: {
    log: logReducer,
    subs: subsReducer,
  },
});
