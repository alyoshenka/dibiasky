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

export const printData = (data, topic) => {
    console.log('- Received:', data.value, 'from', topic)
}

// todo: func that handles then unsubscribes
export const handleCommandResponse = (data, topic, subscription) => {
    printData(data, topic)
    console.log('* Unsubscribing from', topic)
    subscription.unsubscribe()
}

export const subscribe = (topic, callback) => {
    console.log('* Subscribing to:', topic)
    return PubSub.subscribe(topic).subscribe( {
        next: data => callback(data, topic), // Triggered every time a message is successfully received for the topic
        error: console.error, // Triggered when subscription attempt fails
        complete: () => console.log('* Unsubscribed') // Triggered when you unsubscribe from the topic
      })
}

export const publish = async (topic, payload) => {
    console.log('* Publishing to:', topic, JSON.stringify(payload))
    await PubSub.publish(topic, payload)
}

// Sends "print" command to Hubble
export const sendCommand = async() => {
    const topic = topics.hubble_command_req;
    const payload = payloads.hubble_print_command;
    const sub_topic = payloads.hubble_print_command.topic;
    const subscription = subscribe(sub_topic, (d,t) => handleCommandResponse(d,t,subscription));
    publish(topic, payload);
}

export const returnOne = () => { return 1 }