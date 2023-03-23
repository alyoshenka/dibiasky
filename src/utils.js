/* eslint-disable no-console */
/* eslint-disable comma-dangle */
import {
  Amplify, PubSub, Hub, Auth,
} from 'aws-amplify';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AWSIoTProvider, CONNECTION_STATE_CHANGE } from '@aws-amplify/pubsub';

import * as topics from './topics';
import * as payloads from './payloads';

// Apply plugin with configuration
export const setupAmplify = () => {
  console.log('--- setting up Amplify');
  Amplify.addPluggable(
    new AWSIoTProvider({
      aws_pubsub_region: 'us-west-2',
      aws_pubsub_endpoint: process.env.REACT_APP_AWS_PUBSUB_ENDPOINT
    })
  );
};

export const listenForConnectionStateChanges = () => {
  console.log('--- Listening for connection state changes');
  Hub.listen('pubsub', (data) => {
    console.log('--- Data:', data);
    const { payload } = data;
    if (payload.event === CONNECTION_STATE_CHANGE) {
      const { connectionState } = payload.data;
      console.log('--- Connection state:', connectionState);
    }
  });
};

export const getCurrentCredentials = async () => (await Auth.currentCredentials()).identityId;

export const getEndpoint = () => process.env.REACT_APP_AWS_PUBSUB_ENDPOINT;

export const displayCurrentCredentials = async () => {
  console.log('- Endpoint:', getEndpoint());
  console.log('- Cognito:', await getCurrentCredentials());
};

export const printData = (data, topic) => {
  console.log('- Received:', data.value, 'from', topic);
};

// todo: func that handles then unsubscribes
export const handleCommandResponse = (data, topic, subscription) => {
  printData(data, topic);
  console.log('* Unsubscribing from', topic);
  subscription.unsubscribe();
};

export const subscribe = (topic, callback) => {
  console.log('* Subscribing to:', topic);
  return PubSub.subscribe(topic).subscribe({
    // Triggered every time a message is successfully received for the topic
    next: (data) => callback(data, topic),
    // Triggered when subscription attempt fails
    error: console.error,
    // Triggered when you unsubscribe from the topic
    complete: () => console.log('* Unsubscribed')
  });
};

export const publish = async (topic, payload) => {
  console.log('* Publishing to:', topic, JSON.stringify(payload));
  await PubSub.publish(topic, payload);
};

// Sends "print" command to Hubble
export const sendCommand = async () => {
  const topic = topics.hubblCommandReq;
  const payload = payloads.hubblePrintCommand;
  const subTopic = payloads.hubblePrintCommand.topic;
  const subscription = subscribe(subTopic, (d, t) => handleCommandResponse(d, t, subscription));
  publish(topic, payload);
};

export const returnOne = () => 1;
