// todo: organize this file + docstring

import store from '../state/store';
import { logAdded } from '../state/logSlice';

// todo: is this a stupid doc comment?
/**
 * @param {string} entry entry to add to log
 */
// eslint-disable-next-line import/prefer-default-export
export const addEntryToLog = (entry) => {
  // only if all the fields filled
  // todo: error checking
  if (entry) {
    store.dispatch(logAdded(entry));
  }
};
