import React from 'react';
import { Amplify } from 'aws-amplify';
import PropTypes from 'prop-types';
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

function AWS({ setIsConnected }) {
  return (
    <div>
      <ConnectionStatus setIsConnected={setIsConnected} />
      <h2>AWS Stuff</h2>
      <ActiveSubscriptions />
      <ConnectedDevices />
      <Log />
    </div>
  );
}

AWS.propTypes = {
  setIsConnected: PropTypes.func.isRequired,
};

export default AWS;
