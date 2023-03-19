import './App.css';
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import { Amplify } from 'aws-amplify';
import * as utils from './utils'
import * as topics from './topics'
import * as payloads from './payloads'
Amplify.configure(awsExports);

utils.setupAmplify();
utils.listenForConnectionStateChanges();
utils.getCurrentCredentials();
const printDataSub = utils.subscribe(topics.subscribe, (d,t) => utils.handleCommandResponse(d,t,printDataSub));

function App({ signOut, user }) {
  return (
    <div style={styles.container}>
      <Heading level={1}>Hello {user.username}</Heading>
      <Button onClick={signOut}>Sign out</Button>
      <Button onClick={() => utils.publish(topics.publish, payloads.hello)}>Say Hello</Button>
      <Button onClick={utils.sendCommand}>Send "print" command to Hubble</Button>
    </div>
  );
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default withAuthenticator(App);
