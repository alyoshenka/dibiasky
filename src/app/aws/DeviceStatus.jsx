/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import Chip from '@mui/material/Chip';
import { blueGrey, green } from '@mui/material/colors';
import { subscribe, addEntryToLog } from '../utils/utils';
import { deviceConnected, deviceDisconnected } from '../utils/topics';

function DeviceStatus({ deviceId, deviceName }) {
  const [isConnected, setIsConnected] = useState(false);
  // todo: just use isConnected
  const [connectionMessage, setConnectionMessage] = useState('Disconnected');
  const [connectionColor, setConnectionColor] = useState(blueGrey[500]);

  const onConnected = (topic, payload) => {
    setIsConnected(true);
    setConnectionMessage('Connected');
    setConnectionColor(green[500]);
    addEntryToLog(`${deviceId} connected`); // not working??
  };
  const onDisconnected = (topic, payload) => {
    setIsConnected(false);
    setConnectionMessage('Disconnected');
    setConnectionColor(blueGrey[500]);
    addEntryToLog(`${deviceId} disconnected`);
  };

  useEffect(() => {
    subscribe(`${deviceConnected}/${deviceId}`, onConnected);
    subscribe(`${deviceDisconnected}/${deviceId}`, onDisconnected);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <h4>
        {`${deviceName} Status: `}
      </h4>
      <Chip label={connectionMessage} style={{ backgroundColor: connectionColor, alignSelf: 'center' }} />
    </div>
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
