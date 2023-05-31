import React from 'react';
import { Amplify } from 'aws-amplify';
import awsExports from '../../aws-exports';
import * as topics from '../../utils/topics';
import ConnectionStatus from './displays/ConnectionStatus';
import ActiveSubscriptions from './displays/ActiveSubscriptions';
import ConnectedDevices from './displays/ConnectedDevices';
import Log from './displays/Log';
import { setupAmplify, displayConnectionStateChanges } from '../../utils/amplify';
import { subscribe } from '../../utils/pubsub';
import { printData } from '../../utils/commandOperations';

Amplify.configure(awsExports);

setupAmplify();
displayConnectionStateChanges();
// utils.displayAuthStateChanges();

// need this to keep the connection open
subscribe(topics.hubbleCommandRes, printData);
subscribe(topics.scheduleCommandRes, printData);

function AWS() {
  return (
    <div>
      <ConnectionStatus />
      <h2>AWS Stuff</h2>
      <ActiveSubscriptions />
      <ConnectedDevices />
      <Log />
    </div>
  );
}

export default AWS;
