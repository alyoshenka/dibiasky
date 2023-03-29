/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
/* eslint-disable react/prop-types */
import React from 'react';
import './App.css';
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import * as utils from './utils';
import * as topics from './topics';
import * as payloads from './payloads';
import Tester from './Tester';
import AvailableOperations from './AvailableOperations';
import gear from './images/gear.png';

Amplify.configure(awsExports);

const styles = {
  container: {
    backgroundColor: 'blue', width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20,
  },
  button: {
    color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px',
  },
  black: { outline: 'black' },
  red: { outline: 'red' },
};

utils.setupAmplify();
utils.displayCurrentCredentials();
utils.displayConnectionStateChanges();
utils.displayAuthStateChanges();

// need this to keep the connection open
utils.subscribe('cmd/neo/res', utils.printData);

function App({ signOut, user }) {
  return (
    <div id="page" style={{ outline: '1px solid black', display: 'flex', flexDirection: 'column' }}>
      <div
        id="header"
        style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'paleturquoise', alignItems: 'flex-end',
        }}
      >
        <img src={gear} alt="gear" style={{ height: 100, width: 100 }} />
        <h2>Neo</h2>
        <div
          id="auth"
          style={{
            flexDirection: 'column',
          }}
        >
          <Heading level={1}>
            Hello
            {' '}
            {user.username}
          </Heading>
          <Button style={styles.button} onClick={signOut}>Sign out</Button>
        </div>
      </div>
      <div id="work">
        <div id="nav" style={{ outline: '1px solid black', display: 'flex' }}>
          <p>Home</p>
          <p>About</p>
        </div>
        <div
          id="work-2"
          style={{
            outline: '1px solid black', display: 'flex', flexDirection: 'row', justifyContent: 'space-around',
          }}
        >
          <div id="left" style={{ outline: '1px solid black', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div
              id="select-actions"
              style={{
                outline: '1px solid black', backgroundColor: 'lightblue', display: 'flex', flexDirection: 'column',
              }}
            >
              <AvailableOperations />
              <p>Select an action</p>
              <Button
                style={styles.button}
                onClick={() => utils.publish(topics.publish, payloads.hello)}
              >
                Say Hello
              </Button>
              <Button style={styles.button} onClick={utils.sendPrintCommand}>
                Send &quot;print&quot; command to Hubble
              </Button>
              {/* eslint-disable-next-line max-len */}
              { /*<Button onClick={utils.sendNeopixeltestCommand} disabled="true">Run Neopixel Test</Button>*/ }
            </div>
            <div
              id="board-display"
              style={{
                outline: '1px solid black', width: 800, height: 200,
              }}
            >
              <p>Board Display</p>
            </div>
          </div>
          <div id="right" style={{ outline: '1px solid black', flexDirection: 'row' }}>
            <div id="connection-status" style={{ outline: '1px solid black' }}>
              <Tester />
            </div>
            <div id="log" style={{ outline: '1px solid black', flex: 'flex-grow' }}>
              <p>Log</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuthenticator(App);
