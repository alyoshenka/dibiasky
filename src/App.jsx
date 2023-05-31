/* eslint-disable react/prop-types */
import React from 'react';
// import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import './App.css';
import { withAuthenticator, Heading } from '@aws-amplify/ui-react';
// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css';
import * as topics from './utils/topics';
import * as payloads from './utils/payloads';
import AWS from './components/aws/AWS';
import AvailableOperations from './components/operations/select/AvailableOperations';
import ScheduledOperations from './components/operations/scheduled/ScheduledOperations';
import gear from './images/gear.png';
// import ColorButtons from './pages/testPage';
// import ResponsiveAppBar from './components/appBar';
import { publish } from './utils/pubsub';

// todo: put these all into their own file
const styles = {
  container: {
    backgroundColor: 'red', width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20,
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
  left: {
    outline: '1px solid black',
    width: '50%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: '2%',
  },
  selectActions: {
    outline: '1px solid black',
    backgroundColor: 'lightblue',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  boardDisplay: { outline: '1px solid black', width: '100%', height: '100%' },
  right: {
    outline: '1px solid black',
    flexDirection: 'row',
    width: '50%',
    paddingLeft: '2%',
  },
};

/**  Homepage of the application */
function App({ signOut, user }) {
  // todo: put into individual components
  return (
    <div id="page" style={styles.page}>
      <div id="header" style={styles.header}>
        <img src={gear} alt="gear" style={styles.gear} />
        <Button href="/testPage" sx={{ fontSize: 64, fontWeight: 'bold', color: 'text.primary' }}>Neo</Button>
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
        <div id="work-2" style={styles.work2}>
          <div id="left" style={styles.left}>
            <div id="select-actions" style={styles.selectActions}>
              <AvailableOperations />
            </div>
            <ScheduledOperations />
            <div id="board-display" style={styles.boardDisplay}>
              <p>Board Display</p>
            </div>
          </div>
          <div id="right" style={styles.right}>
            <AWS />
            <Button variant="contained" color="primary" type="button" onClick={() => publish(topics.hubbleCommandReq, payloads.hubbleEchoCommand)}>Echo Hello</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuthenticator(App);
