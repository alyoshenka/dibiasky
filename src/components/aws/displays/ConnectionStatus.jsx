import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
import store from '../../../state/store';
import { updateConnectionStatus } from '../../../state/connectionStatusSlice';

function ConnectionStatus() {
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

  const connectionStatus = useSelector((state) => state.connectionStatus);
  const [connectionColor, setConnectionColor] = useState(colorDefault);

  const onConnectionStateChange = (newState) => {
    // setConnectionState(newState);
    setConnectionColor(colorMap[newState]);
    addEntryToLog('ConnectionState:', newState);
    store.dispatch(updateConnectionStatus(newState));
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
      <Chip label={connectionStatus.connectionState} style={{ backgroundColor: connectionColor[500], alignSelf: 'center' }} />
    </div>
  );
}

export default ConnectionStatus;
