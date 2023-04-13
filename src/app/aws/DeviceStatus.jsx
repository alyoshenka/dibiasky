/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { subscribe, addEntryToLog } from '../utils/utils';
import { deviceConnected, deviceDisconnected } from '../utils/topics';

function DeviceStatus({ deviceId, deviceName }) {
  const [isConnected, setIsConnected] = useState(false);

  const onConnected = (topic, payload) => {
    setIsConnected(true);
    addEntryToLog(`${deviceId} connected`); // not working??
  };
  const onDisconnected = (topic, payload) => {
    setIsConnected(false);
    addEntryToLog(`${deviceId} disconnected`);
  };

  useEffect(() => {
    subscribe(`${deviceConnected}/${deviceId}`, onConnected);
    subscribe(`${deviceDisconnected}/${deviceId}`, onDisconnected);
  }, []);

  return (
    <h3>
      {`${deviceName} Status: `}
      {isConnected ? 'Connected' : 'Disconnected'}
    </h3>
  );
}

DeviceStatus.propTypes = {
  deviceId: PropTypes.string.isRequired,
  deviceName: PropTypes.string,
};

DeviceStatus.defaultProps = {
  deviceName: 'Device',
};

export default DeviceStatus;
