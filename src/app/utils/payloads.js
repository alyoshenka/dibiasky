/* eslint-disable comma-dangle */

/*
todo:
  this is all very much hardcoded.
  design a better system for sending this information.
*/

import * as topics from './topics';

export const hello = { msg: 'hello' };

/** Payload to print a string to the console */
export const hubblePrintCommand = {
  topic: topics.hubbleCommandRes,
  action: {
    cmd: 'print',
    data: 'hello from an MQTT topic'
  }
};

/**
 * @param {string} action the neopolitan action to perform
 * @returns the generated neopolitan operation payload
 */
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

/**
 * @param {object} options values to send to neopolitan update operation
 * @returns the full neopolitan update command payload
 */
const neopolitanUpdateOperation = (options) => {
  const ogOp = neopolitanOperation('update');
  ogOp.action.options = options; // todo: better way to do this?
  return ogOp;
};

export const neopolitanTest = neopolitanOperation('test');
export const neopolitanOpen = neopolitanOperation('open');
export const neopolitanClose = neopolitanOperation('close');
export const neopolitanUpdate = (options) => neopolitanUpdateOperation(options);

export const hubbleEchoCommand = {
  topic: topics.hubbleCommandRes,
  action: {
    cmd: 'say',
    data: 'hello'
  }
};
