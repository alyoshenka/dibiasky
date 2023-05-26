// todo: organize this file + docstring

import { PubSub } from 'aws-amplify';
import store from '../state/store';
import { subAdded } from '../state/subsSlice';
import { addEntryToLog } from './log';

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
    complete: () => addEntryToLog(`Unsubscribed from ${topic}`),
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
