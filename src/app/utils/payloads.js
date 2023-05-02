/* eslint-disable comma-dangle */

/*
todo:
  this is all very much hardcoded.
  design a better system for sending this information.
*/

import * as topics from './topics';

export const hello = { msg: 'hello' };

export const hubblePrintCommand = {
  topic: topics.hubbleCommandRes,
  action: {
    cmd: 'print',
    data: 'hello from an MQTT topic'
  }
};

const neopolitanOperation = (action) => {
  const obj = {
    topic: topics.hubbleCommandRes,
    action: {
      cmd: 'neopolitan',
      data: action
    }
  };
  return obj;
};

// eslint-disable-next-line no-unused-vars
const neopolitanUpdateOperation = (args) => {
  const ogOp = neopolitanOperation('update');
  ogOp.action.options = args; // todo: better way to do this?
  return ogOp;
};

export const neopolitanTest = neopolitanOperation('test');
export const neopolitanOpen = neopolitanOperation('open');
export const neopolitanClose = neopolitanOperation('close');
export const neopolitanUpdate = (args) => neopolitanUpdateOperation(args);

export const hubbleEchoCommand = {
  topic: topics.hubbleCommandRes,
  action: {
    cmd: 'say',
    data: 'hello'
  }
};
