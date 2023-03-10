import * as topics from './topics'

export const hello = { msg: 'hello' };

export const hubble_print_command = { 
    topic: topics.hubble_command_res,
    action: {
        cmd: 'print',
        data: 'hello from an MQTT topic'
    }
};