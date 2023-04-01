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
import * as payloads from './payloads';

const addEntryToLog = (entry) => {
  // only if all the fields filled
  // todo: error checking
  if (entry) {
    store.dispatch(logAdded(entry));
  }
};

// Apply plugin with configuration
export const setupAmplify = () => {
  addEntryToLog('Setting up Amplify');
  Amplify.addPluggable(
    new AWSIoTProvider({
      aws_pubsub_region: 'us-west-2',
      aws_pubsub_endpoint: process.env.REACT_APP_AWS_PUBSUB_ENDPOINT
    })
  );
};

export const displayConnectionStateChanges = () => {
  Hub.listen('pubsub', (data) => {
    const { payload } = data;
    if (payload.event === CONNECTION_STATE_CHANGE) {
      const { connectionState } = payload.data;
      addEntryToLog(`Connection state: ${connectionState}`);
    }
  });
};

export const displayAuthStateChanges = () => {
  Hub.listen('auth', (data) => {
    console.log('Auth:', data);
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

export const printData = (data, topic) => {
  console.log('- Received:', data.value, 'from', topic);
};

// todo: func that handles then unsubscribes
export const handleCommandResponse = (data, topic, subscription) => {
  printData(data, topic);
  console.log(`Unsubscribing from ${topic}`);
  const payload = { route: topic };
  store.dispatch(subRemoved(payload));
  subscription.unsubscribe();
};

// eslint-disable-next-line consistent-return
export const subscribe = (topic, callback) => {
  const payload = { route: topic };
  if (store.getState().subs.some((item) => item.route === payload.route)) {
    addEntryToLog(`Already subscribed to: ${topic}`);
  } else {
    store.dispatch(subAdded(payload));

    addEntryToLog(`Subscribing to: ${topic}`);
    return PubSub.subscribe(topic).subscribe({
      // Triggered every time a message is successfully received for the topic
      next: (data) => callback(data, topic),
      // Triggered when subscription attempt fails
      error: console.error,
      // Triggered when you unsubscribe from the topic
      complete: () => addEntryToLog(`Unsubscribed from ${topic}`)
    });
  }
};

export const publish = async (topic, payload) => {
  addEntryToLog(`Publishing to: ${topic}; data: ${JSON.stringify(payload)}`);
  await PubSub.publish(topic, payload).then(() => { console.log('Published'); });
};

export const sendNeopixeltestCommand = async () => {
  const topic = topics.hubbleCommandReq;
  const payload = payloads.hubbleRunNeopixeltest;
  // no subscription (yet)
  // const subTopic = payloads.hubblePrintCommand.topic;
  // const subscription = subscribe(subTopic, (d, t) => handleCommandResponse(d, t, subscription));
  publish(topic, payload);
};

// Sends "print" command to Hubble
export const sendPrintCommand = async () => {
  const topic = topics.hubbleCommandReq;
  const payload = payloads.hubblePrintCommand;
  const subTopic = payloads.hubblePrintCommand.topic;
  const subscription = subscribe(subTopic, (d, t) => handleCommandResponse(d, t, subscription));
  publish(topic, payload);
};

export const requestHubbleOperations = async () => {
  publish(topics.reqHubbleOperations, null);
};

export const returnOne = () => 1;
