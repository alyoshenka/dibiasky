import React from 'react';
import { Amplify } from 'aws-amplify';
import PropTypes from 'prop-types';
import awsExports from '../../aws-exports';
import * as utils from '../utils/utils';
import * as topics from '../utils/topics';
import ConnectionStatus from './ConnectionStatus';
import ActiveSubscriptions from './ActiveSubscriptions';
import ConnectedDevices from './ConnectedDevices';
import Log from './Log';

Amplify.configure(awsExports);

utils.setupAmplify();
utils.displayConnectionStateChanges();
// utils.displayAuthStateChanges();

// need this to keep the connection open
utils.subscribe(topics.hubbleCommandRes, utils.printData);
utils.subscribe(topics.scheduleCommandRes, utils.printData);

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
