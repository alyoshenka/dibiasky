// todo: organize this file + docstring

import {
  Amplify, Hub, Auth,
} from 'aws-amplify';
import { AWSIoTProvider, CONNECTION_STATE_CHANGE } from '@aws-amplify/pubsub';
import { addEntryToLog } from './log';
import { onSignOut } from './utils';

/** Apply plugin with configuration */
export const setupAmplify = () => {
  addEntryToLog('Setting up Amplify');
  Amplify.addPluggable(
    new AWSIoTProvider({
      aws_pubsub_region: process.env.REACT_APP_REGION,
      aws_pubsub_endpoint: process.env.REACT_APP_AWS_PUBSUB_ENDPOINT,
    }),
  );
};

/** Add entries to log when App<->AWS connection state changes */
export const displayConnectionStateChanges = () => {
  Hub.listen('pubsub', (data) => {
    const { payload } = data;
    if (payload.event === CONNECTION_STATE_CHANGE) {
      const { connectionState } = payload.data;
      addEntryToLog(`Connection state: ${connectionState}`);
    }
  });
};

/** Add entries to log when AWS Authentication state changes */
export const displayAuthStateChanges = () => {
  // addEntryToLog
  Hub.listen('auth', (data) => {
    console.log(`Auth: ${data}`);
    switch (data.payload.event) {
      case 'signIn':
        console.log('user signed in');
        break;
      case 'signUp':
        console.log('user signed up');
        break;
      case 'signOut':
        console.log('user signed out');
        onSignOut();
        break;
      case 'signIn_failure':
        console.log('user sign in failed');
        break;
      case 'configured':
        console.log('the Auth module is configured');
        break;
      default:
        break;
    }
  });
};

export const getCurrentCredentials = async () => (await Auth.currentCredentials()).identityId;
