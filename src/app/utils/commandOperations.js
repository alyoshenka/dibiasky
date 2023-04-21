// todo: docstring

import {
  publish,
  subscribe,
  addEntryToLog,
  handleCommandResponse,
} from './utils';
import * as topics from './topics';
import * as payloads from './payloads';

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

export const unsupportedCommand = () => {
  addEntryToLog('Unsupported command');
};

// todo: make this better
// eslint-disable-next-line no-unused-vars
export const mapCommandToFunction = (cmdStr) => unsupportedCommand;
