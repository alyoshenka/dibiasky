/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './App.css';
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css';
import * as utils from './app/utils/utils';
import * as topics from './app/utils/topics';
import * as payloads from './app/utils/payloads';
import AWS from './app/aws/AWS';
import AvailableOperations from './app/aws/AvailableOperations';
import Log from './app/Log';
import gear from './images/gear.png';

const styles = {
  container: {
    backgroundColor: 'blue', width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20,
  },
  button: {
    color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px',
  },
};

function App({ signOut, user }) {
  // todo: is this the correct place for this? where to put it??
  const [isConnectedToAWS, setIsConnectedToAWS] = useState(false);

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
            backgroundColor: 'turquoise',
          }}
        >
          <Heading level={1}>
            Hello
            {' '}
            {user.username}
          </Heading>
          <div id="signout-button" style={{ flex: 'flex-grow' }}>
            <Button style={styles.button} onClick={signOut}>Sign out</Button>
          </div>
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
              <AvailableOperations isConnected={isConnectedToAWS} />
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
              <Button onClick={utils.sendNeopixeltestCommand}>Run Neopixel Test</Button>
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
            <AWS setIsConnected={setIsConnectedToAWS} />
            <button type="button" onClick={() => utils.publish(topics.hubbleCommandReq, payloads.hubbleEchoCommand)}>Echo Hello</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuthenticator(App);
