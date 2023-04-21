import React from 'react';
import { Amplify } from 'aws-amplify';
import awsExports from '../../aws-exports';
import * as utils from '../utils/utils';
import * as topics from '../utils/topics';
import ConnectionStatus from './ConnectionStatus';
import ActiveSubscriptions from './ActiveSubscriptions';
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
  const deviceStatuses = [
    { deviceId: 'Hubble', deviceName: 'Hubble' },
    { deviceId: 'Krib', deviceName: 'Krib' },
  ];

  return (
    <>
      <ConnectionStatus />
      <h2>AWS Stuff</h2>
      <ActiveSubscriptions />
      <h3>IoT Devices:</h3>
      {deviceStatuses.map(
        (device) => (
          <DeviceStatus
            key={device.deviceId}
            deviceId={device.deviceId}
            deviceName={device.deviceName}
          />
        ),
      )}
      <Log />
    </>
  );
}

export default AWS;
