/* eslint-disable comma-dangle */
import * as topics from './topics';

export const hello = { msg: 'hello' };

export const hubblePrintCommand = {
  topic: topics.hubbleCommandRes,
  action: {
    cmd: 'print',
    data: 'hello from an MQTT topic'
  }
};

export const hubbleRunNeopixeltest = {
  topic: topics.hubbleCommandRes,
  action: {
    cmd: 'run',
    data: 'neopixeltest'
  }
};

export const hubbleEchoCommand = {
  topic: topics.hubbleCommandRes,
  action: {
    cmd: 'say',
    data: 'hello'
  }
};
