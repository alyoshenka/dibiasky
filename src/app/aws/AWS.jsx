import React from 'react';
import { Amplify } from 'aws-amplify';
import awsExports from '../../aws-exports';
import * as utils from '../utils/utils';
import * as topics from '../utils/topics';
import ConnectionStatus from './ConnectionStatus';
import ActiveSubscriptions from './ActiveSubscriptions';
import HubbleStatus from './HubbleStatus';
import DeviceStatus from './DeviceStatus';
import Log from '../Log';

Amplify.configure(awsExports);

utils.setupAmplify();
utils.displayCurrentCredentials();
utils.displayConnectionStateChanges();
utils.displayAuthStateChanges();

// need this to keep the connection open
utils.subscribe(topics.hubbleCommandRes, utils.printData);

function AWS() {
  return (
    <>
      <ConnectionStatus />
      <h2>AWS Stuff</h2>
      <ActiveSubscriptions />
      <HubbleStatus />
      <DeviceStatus deviceId="Krib" deviceName="Krib" />
      <Log />
    </>
  );
}

export default AWS;
