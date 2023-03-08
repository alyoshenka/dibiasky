import './App.css';
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import { Amplify, PubSub, Hub, Auth } from 'aws-amplify';
import { AWSIoTProvider, CONNECTION_STATE_CHANGE } from '@aws-amplify/pubsub';
Amplify.configure(awsExports);

// Apply plugin with configuration
Amplify.addPluggable(
  new AWSIoTProvider({
    aws_pubsub_region: 'us-west-2',
    aws_pubsub_endpoint: process.env.REACT_APP_AWS_PUBSUB_ENDPOINT
  })
);

Hub.listen('pubsub', (data) => {
  const { payload } = data;
  if (payload.event === CONNECTION_STATE_CHANGE) {
    const connectionState = payload.data.connectionState;
    console.log('connection state:', connectionState);
  }
})

Auth.currentCredentials().then((info) => {
  const cognitoIdentityId = info.identityId;
  console.log('cognito: ' + cognitoIdentityId)
  console.log('endpoint:', process.env.REACT_APP_AWS_PUBSUB_ENDPOINT)
});

PubSub.subscribe('test').subscribe( {
  next: data => console.log('received:', data),
  error: err => console.error(err),
  complete: () => console.log('done')
})

async function click() {
  console.log('publish')
  await PubSub.publish('sub_topic', { msg: 'hello'})
}

function App({ signOut, user }) {
  return (
    <div style={styles.container}>
      <Heading level={1}>Hello {user.username}</Heading>
      <Button onClick={signOut}>Sign out</Button>
      <Button onClick={click}>Press</Button>
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
