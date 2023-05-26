// todo: docstring
// todo: organize this file

import store from '../state/store';
import { publish, subscribe } from './pubsub';
import { subRemoved } from '../state/subsSlice';
import { addEntryToLog } from './log';
import * as topics from './topics';
import * as payloads from './payloads';

// todo: this is a stupid function. design code better
/**
 * Generate a command payload based on an operation object
 * @param {object} operation operation
 * @returns payload to publish
 */
const getNeopolitanCommandPayload = (operation) => {
  if (!(operation && operation.subCommand)) {
    addEntryToLog(`No operation passed: ${operation}`);
    return null;
  }

  switch (operation.subCommand) {
    case 'test':
      return payloads.neopolitanTest;
    case 'open':
      return payloads.neopolitanOpen;
    case 'close':
      return payloads.neopolitanClose;
    case 'update':
      if (!operation.options) {
        addEntryToLog(`No options passed for update operation: ${operation}`);
        return null;
      }
      return payloads.neopolitanUpdate(operation.options);
    default:
      addEntryToLog(`Unable to get neopolitan command payload: ${operation}`);
      return null;
  }
};

// todo: don't need to specify neopolitan
/**
 * Publishes to a topic such that the Neopolitan drawing library is utilized
 * @param {object} operation operation payload
 */
export const sendNeopolitanCommand = async (operation) => {
  const topic = topics.hubbleCommandReq;
  const payload = getNeopolitanCommandPayload(operation);
  // no subscription (yet)
  // const subTopic = payloads.hubblePrintCommand.topic;
  // const subscription = subscribe(subTopic, (d, t) => handleCommandResponse(d, t, subscription));
  publish(topic, payload);
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

/** Publish to topic with payload specifying printing to console */
export const sendPrintCommand = async (opr) => {
  const topic = topics.hubbleCommandReq;
  const payload = payloads.hubblePrintCommand;
  payload.data = opr.data;
  const subTopic = payloads.hubblePrintCommand.topic;
  const subscription = subscribe(subTopic, (d, t) => handleCommandResponse(d, t, subscription));
  publish(topic, payload);
};

const sendScheduleCommand = (opr) => {
  // eslint-disable-next-line no-param-reassign
  opr.executeAt = opr.options.executeAt;
  publish(topics.scheduleCommandReq, opr);
};

export const unsupportedCommand = () => {
  addEntryToLog('Unsupported command');
};

// todo: make this better
/**
 * @param {object} operation given operation
 * @returns appropriate function operation
 */
export const mapCommandToFunction = (operation) => {
  if (operation.module === 'neopolitan') {
    return () => sendNeopolitanCommand(operation);
  }
  if (operation.module === 'print') {
    return () => sendPrintCommand(operation);
  }
  if (operation.module === 'testSchedule') {
    return () => sendScheduleCommand(operation);
  }
  return unsupportedCommand;
};

/** Publish to topic such that available `neo` operations are published */
export const requestHubbleOperations = async () => {
  publish(topics.reqHubbleOperations, null); // todo: should have res payload
};
