/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable comma-dangle */
import {
  Amplify, PubSub, Hub, Auth,
} from 'aws-amplify';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AWSIoTProvider, CONNECTION_STATE_CHANGE } from '@aws-amplify/pubsub';
import { subAdded, subRemoved } from './subsSlice';
import { logAdded } from '../logSlice';
import store from '../store';
import * as topics from './topics';

// todo: is this a stupid doc comment?
/**
 * @param {string} entry entry to add to log
 */
export const addEntryToLog = (entry) => {
  // only if all the fields filled
  // todo: error checking
  if (entry) {
    store.dispatch(logAdded(entry));
  }
};

/** Apply plugin with configuration */
export const setupAmplify = () => {
  addEntryToLog('Setting up Amplify');
  Amplify.addPluggable(
    new AWSIoTProvider({
      aws_pubsub_region: 'us-west-2',
      aws_pubsub_endpoint: process.env.REACT_APP_AWS_PUBSUB_ENDPOINT
    })
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
  Hub.listen('auth', (data) => {
    addEntryToLog(`Auth: ${data}`);
    switch (data.payload.event) {
      case 'signIn':
        addEntryToLog('user signed in');
        break;
      case 'signUp':
        addEntryToLog('user signed up');
        break;
      case 'signOut':
        addEntryToLog('user signed out');
        break;
      case 'signIn_failure':
        addEntryToLog('user sign in failed');
        break;
      case 'configured':
        addEntryToLog('the Auth module is configured');
        break;
      default:
        break;
    }
  });
};

export const getCurrentCredentials = async () => (await Auth.currentCredentials()).identityId;

export const getEndpoint = () => process.env.REACT_APP_AWS_PUBSUB_ENDPOINT;

export const displayCurrentCredentials = async () => {
  addEntryToLog(`Endpoint: ${getEndpoint()}`);
  addEntryToLog(`Cognito: ${await getCurrentCredentials()}`);
};

/**
 * Dummy callback function to display data on subscription received
 * @param {object} data payload from subscription
 * @param {string} topic topic it was sent from
 */
export const printData = (data, topic) => {
  addEntryToLog(`Received ${JSON.stringify(data.value)} from ${topic}`);
};

// todo: func that handles then unsubscribes
/**
 * Handles an operation (previous subscription) then unsubscribes from the topic that sent it
 * @param {object} data payload
 * @param {string} topic sender
 * @param {*} subscription subscription object (used to unsubscribe)
 */
export const handleCommandResponse = (data, topic, subscription) => {
  printData(data, topic);
  addEntryToLog(`Unsubscribing from ${topic}`);
  const payload = { route: topic };
  store.dispatch(subRemoved(payload));
  subscription.unsubscribe();
};

/**
 * @param {*} topic topic to subscribe to
 * @param {*} callback function to call when topic is published to
 * @returns the created subscription
 */
export const subscribe = (topic, callback) => {
  const payload = { route: topic };
  if (store.getState().subs.some((item) => item.route === payload.route)) {
    addEntryToLog(`Already subscribed to: ${topic}`);
  } else {
    store.dispatch(subAdded(payload));
    addEntryToLog(`Subscribing to: ${topic}`);
  }
  // should be able to subscribe to one topic with multiple payloads
  return PubSub.subscribe(topic).subscribe({
    // Triggered every time a message is successfully received for the topic
    next: (data) => callback(data, topic),
    // Triggered when subscription attempt fails
    error: console.error,
    // Triggered when you unsubscribe from the topic
    complete: () => addEntryToLog(`Unsubscribed from ${topic}`)
  });
};

/**
 * @param {*} topic topic to publish to
 * @param {*} payload data to send
 */
export const publish = async (topic, payload) => {
  addEntryToLog(`Publishing to: ${topic}; data: ${JSON.stringify(payload)}`);
  await PubSub.publish(topic, payload).then(() => { addEntryToLog(`Successfully published to ${topic}`); });
};

/** Publish to topic such that available `neo` operations are published */
export const requestHubbleOperations = async () => {
  publish(topics.reqHubbleOperations, null); // todo: should have res payload
};

// todo: take out
/** Dummy function to set up tests */
export const returnOne = () => 1;
