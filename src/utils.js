import { Amplify, PubSub, Hub, Auth } from 'aws-amplify';
import { AWSIoTProvider, CONNECTION_STATE_CHANGE } from '@aws-amplify/pubsub';

import * as topics from './topics'
import * as payloads from './payloads'

// Apply plugin with configuration
export const setupAmplify = () => {
    console.log('--- setting up Amplify')
    Amplify.addPluggable(
        new AWSIoTProvider({
            aws_pubsub_region: 'us-west-2',
            aws_pubsub_endpoint: process.env.REACT_APP_AWS_PUBSUB_ENDPOINT
        })
    );
}

export const listenForConnectionStateChanges = () => {
    console.log('--- listening for connection state changes')
    Hub.listen('pubsub', (data) => {
        const { payload } = data;
        if (payload.event === CONNECTION_STATE_CHANGE) {
          const connectionState = payload.data.connectionState;
          console.log('connection state:', connectionState);
        }
      })
}

export const getCurrentCredentials = () => {
    Auth.currentCredentials().then((info) => {
        const cognitoIdentityId = info.identityId;
        console.log('cognito: ' + cognitoIdentityId)
        console.log('endpoint:', process.env.REACT_APP_AWS_PUBSUB_ENDPOINT)
      });
}

// todo: callback
export const subscribe = (topic) => {
    console.log('* subscribing to:', topic)
    PubSub.subscribe(topic).subscribe( {
        next: data => console.log('received:', data),
        error: err => console.error(err),
        complete: () => console.log('done')
      })
}

export const publish = async (topic, payload) => {
    console.log('* publishing to:', topic, payload)
    await PubSub.publish(topic, payload)
}

export const sendCommand = async() => {
    const topic = topics.hubble_command_req;
    const payload = payloads.hubble_print_command;
    const subscription = payloads.hubble_print_command.topic;
    subscribe(subscription);
    publish(topic, payload);
}