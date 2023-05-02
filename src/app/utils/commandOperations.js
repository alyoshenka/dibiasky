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
const getNeopolitanCommandPayload = (data) => {
  switch (data) {
    case 'test':
      return payloads.neopolitanTest;
    case 'open':
      return payloads.neopolitanOpen;
    case 'close':
      return payloads.neopolitanClose;
    case 'update':
      return null; // not supported yet
    default:
      return null;
  }
};

export const sendNeopolitanCommand = async (data) => {
  const topic = topics.hubbleCommandReq;
  const payload = getNeopolitanCommandPayload(data);
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
export const mapCommandToFunction = (opr) => {
  if (opr.cmd === 'neopolitan') {
    return () => sendNeopolitanCommand(opr.data);
  }
  if (opr.cmd === 'print') {
    if (opr.data === 'hello') { return sendPrintCommand; }
  }
  return unsupportedCommand;
};
