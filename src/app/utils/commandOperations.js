// todo: docstring

import {
  publish,
  subscribe,
  addEntryToLog,
  handleCommandResponse,
} from './utils';
import * as topics from './topics';
import * as payloads from './payloads';

// todo: this is a stupid function. design code better
/**
 * Generate a command payload based on an operation object
 * @param {object} opr operation
 * @returns payload to publish
 */
const getNeopolitanCommandPayload = (opr) => {
  if (!(opr && opr.data)) {
    addEntryToLog(`No operation passed: ${opr}`);
    return null;
  }
  switch (opr.data) {
    case 'test':
      return payloads.neopolitanTest;
    case 'open':
      return payloads.neopolitanOpen;
    case 'close':
      return payloads.neopolitanClose;
    case 'update':
      if (!opr.options) {
        addEntryToLog(`No options passed for update operation: ${opr}`);
        return null;
      }
      return payloads.neopolitanUpdate(opr.options);
    default:
      addEntryToLog(`Unable to get neopolitan command payload: ${opr}`);
      return null;
  }
};

// todo: don't need to specify neopolitan
/**
 * Publishes to a topic such that the Neopolitan drawing library is utilized
 * @param {object} opr operation payload
 */
export const sendNeopolitanCommand = async (opr) => {
  const topic = topics.hubbleCommandReq;
  const payload = getNeopolitanCommandPayload(opr);
  // no subscription (yet)
  // const subTopic = payloads.hubblePrintCommand.topic;
  // const subscription = subscribe(subTopic, (d, t) => handleCommandResponse(d, t, subscription));
  publish(topic, payload);
};

/** Publish to topic with payload specifying printing to console */
export const sendPrintCommand = async () => {
  const topic = topics.hubbleCommandReq;
  const payload = payloads.hubblePrintCommand;
  const subTopic = payloads.hubblePrintCommand.topic;
  const subscription = subscribe(subTopic, (d, t) => handleCommandResponse(d, t, subscription));
  publish(topic, payload);
};

export const unsupportedCommand = () => {
  addEntryToLog('Unsupported command');
};

// todo: make this better
/**
 * @param {object} opr given operation
 * @returns appropriate function operation
 */
export const mapCommandToFunction = (opr) => {
  if (opr.cmd === 'neopolitan') {
    return () => sendNeopolitanCommand(opr); // todo: func call discrepance
  }
  if (opr.cmd === 'print') {
    if (opr.data === 'hello') { return sendPrintCommand; } // todo: here
  }
  return unsupportedCommand;
};
