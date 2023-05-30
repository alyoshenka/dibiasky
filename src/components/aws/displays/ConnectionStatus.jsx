import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Chip from '@mui/material/Chip';
import {
  green,
  yellow,
  orange,
  red,
  blueGrey,
} from '@mui/material/colors';
import { Hub } from 'aws-amplify';
import { CONNECTION_STATE_CHANGE } from '@aws-amplify/pubsub';
import { addEntryToLog } from '../../../utils/log';

function ConnectionStatus({ setIsConnected }) {
  const colorDefault = blueGrey;
  const colorMap = {
    // Connected and working with no issues.
    Connected: green,
    // The connection has no active subscriptions and is disconnecting.
    ConnectedPendingDisconnect: colorDefault,
    // The connection is open, but has missed expected keep alive messages.
    ConnectedPendingKeepAlive: colorDefault,
    // The connection is open, but the network connection has been disrupted.
    //  When the network recovers, the connection will continue serving traffic.
    ConnectedPendingNetwork: colorDefault,
    // Attempting to connect.
    Connecting: yellow,
    // The connection is disrupted and the network is available.
    ConnectionDisrupted: orange,
    // The connection is disrupted and the network connection is unavailable.
    ConnectionDisruptedPendingNetwork: colorDefault,
    // Connection has no active subscriptions and is disconnecting.
    Disconnected: red,
  };

  const [connectionState, setConnectionState] = useState('undefined');
  const [connectionColor, setConnectionColor] = useState(colorDefault);

  const onConnectionStateChange = (newState) => {
    setConnectionState(newState);
    setConnectionColor(colorMap[newState]);
    setIsConnected(newState === 'Connected');
    addEntryToLog('ConnectionState:', newState);
  };

  const listenForStateChange = () => {
    Hub.listen('pubsub', (data) => {
      const { payload } = data;
      if (payload.event === CONNECTION_STATE_CHANGE) {
        onConnectionStateChange(payload.data.connectionState);
      }
    });
  };

  useEffect(() => {
    listenForStateChange();
  }, []);

  // todo: add connectionstate padding
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <p>Connection State: </p>
      <Chip label={connectionState} style={{ backgroundColor: connectionColor[500], alignSelf: 'center' }} />
    </div>
  );
}

ConnectionStatus.propTypes = {
  setIsConnected: PropTypes.func.isRequired,
};

export default ConnectionStatus;
