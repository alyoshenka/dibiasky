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
import AvailableOperations from './app/operations/AvailableOperations';
import ScheduledOperations from './app/aws/ScheduledOperations';
import gear from './images/gear.png';

// todo: put these all into their own file
const styles = {
  container: {
    backgroundColor: 'blue', width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20,
  },
  button: {
    color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px',
  },
  page: { outline: '1px solid black', display: 'flex', flexDirection: 'column' },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'paleturquoise',
    alignItems: 'flex-end',
  },
  gear: { height: 100, width: 100 },
  auth: { flexDirection: 'column', backgroundColor: 'turquoise' },
  signoutButton: { flex: 'flex-grow' },
  nav: { outline: '1px solid black', display: 'flex' },
  work2: {
    outline: '1px solid black',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  left: { outline: '1px solid black', flexDirection: 'column', justifyContent: 'space-between' },
  selectActions: {
    outline: '1px solid black',
    backgroundColor: 'lightblue',
    display: 'flex',
    flexDirection: 'column',
  },
  boardDisplay: { outline: '1px solid black', width: 800, height: 200 },
  right: { outline: '1px solid black', flexDirection: 'row' },
};

/**  Homepage of the application */
function App({ signOut, user }) {
  // todo: is this the correct place for this? where to put it??
  const [isConnectedToAWS, setIsConnectedToAWS] = useState(false);

  // todo: put into individual components
  return (
    <div id="page" style={styles.page}>
      <div id="header" style={styles.header}>
        <img src={gear} alt="gear" style={styles.gear} />
        <h2>Neo</h2>
        <div id="auth" style={styles.auth}>
          <Heading level={1}>
            Hello
            {' '}
            {user.username}
          </Heading>
          <div id="signout-button" style={styles.signoutButton}>
            <Button style={styles.button} onClick={signOut}>Sign out</Button>
          </div>
        </div>
      </div>
      <div id="work">
        <div id="nav" style={styles.nav}>
          <p>Home</p>
          <p>About</p>
        </div>
        <div id="work-2" style={styles.work2}>
          <div id="left" style={styles.left}>
            <div id="select-actions" style={styles.selectActions}>
              <AvailableOperations isConnected={isConnectedToAWS} />
            </div>
            <ScheduledOperations isConnected={isConnectedToAWS} />
            <div id="board-display" style={styles.boardDisplay}>
              <p>Board Display</p>
            </div>
          </div>
          <div id="right" style={styles.right}>
            <AWS setIsConnected={setIsConnectedToAWS} />
            <button type="button" onClick={() => utils.publish(topics.hubbleCommandReq, payloads.hubbleEchoCommand)}>Echo Hello</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuthenticator(App);
