// todo: organize this file + docstring

/*
todo:
  this is all very much hardcoded.
  design a better system for sending this information.
*/

import * as topics from './topics';

export const hello = { msg: 'hello' };

/** Payload to print a string to the console */
export const hubblePrintCommand = {
  responseTopic: topics.hubbleCommandRes,
  module: 'print',
  data: 'hello from an MQTT topic',
};

/**
 * @param {string} action the neopolitan action to perform
 * @returns the generated neopolitan operation payload
 */
export const neopolitanOperation = (action) => ({
  responseTopic: topics.hubbleCommandRes,
  module: 'neopolitan',
  subCommand: action,
});

/**
 * @param {object} options values to send to neopolitan update operation
 * @returns the full neopolitan update command payload
 */
const neopolitanUpdateOperation = (options) => {
  const operation = neopolitanOperation('update');
  operation.options = options; // todo: better way to do this?
  return operation;
};

export const neopolitanTest = neopolitanOperation('test');
export const neopolitanOpen = neopolitanOperation('open');
export const neopolitanClose = neopolitanOperation('close');
export const neopolitanUpdate = (options) => neopolitanUpdateOperation(options);

export const hubbleEchoCommand = {
  responseTopic: topics.hubbleCommandRes,
  module: 'terminal',
  subCommand: 'echo "hello from the terminal"',
};
