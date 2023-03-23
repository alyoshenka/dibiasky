/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
/* eslint-disable react/prop-types */
import React from 'react';
import './App.css';
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css';
import { Amplify, Hub } from 'aws-amplify';
import { CONNECTION_STATE_CHANGE } from '@aws-amplify/pubsub'; // take out later
import awsExports from './aws-exports';
import * as utils from './utils';
import * as topics from './topics';
import * as payloads from './payloads';
import Tester from './Tester';

const styles = {
  container: {
    width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20,
  },
  button: {
    backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px',
  },
};

Amplify.configure(awsExports);

utils.setupAmplify();

Hub.listen('pubsub', (data) => {
  const { payload } = data;
  console.log('Data:', data);
  if (payload.event === CONNECTION_STATE_CHANGE) {
    const { connectionState } = payload.data;
    console.log('Connection state:', connectionState);
  }
});
// utils.listenForConnectionStateChanges();
utils.displayCurrentCredentials();

const printDataSub = utils.subscribe(
  topics.subscribe,
  (d, t) => utils.handleCommandResponse(d, t, printDataSub),
);

function App({ signOut, user }) {
  return (
    <div style={styles.container}>
      <Heading level={1}>
        Hello
        {' '}
        {user.username}
      </Heading>
      <Button onClick={signOut}>Sign out</Button>
      <Button onClick={() => utils.publish(topics.publish, payloads.hello)}>Say Hello</Button>
      <Button onClick={utils.sendCommand}>Send &quot;print&quot; command to Hubble</Button>
      <Tester />
    </div>
  );
}

export default withAuthenticator(App);
