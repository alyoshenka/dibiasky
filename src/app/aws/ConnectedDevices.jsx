import React, { useState } from 'react';
import { subscribe } from '../utils/utils';
import { deviceConnected, deviceDisconnected } from '../utils/topics';
import DeviceStatus from './DeviceStatus';

// todo: Array.from
function ConnectedDevices() {
  const [connectedDevices, setConnectedDevices] = useState([]);

  const getClientId = (payload) => payload.value.clientId;

  const addConnection = (clientId) => {
    // todo: validation
    if (!connectedDevices.includes(clientId)) {
      console.log(clientId, 'not in', connectedDevices);
      setConnectedDevices((prevConnected) => [
        ...prevConnected, clientId,
      ]);
      console.log('devices:', connectedDevices);
    }
  };
  const removeConnection = (clientId) => setConnectedDevices(
    connectedDevices.filter((id) => id !== clientId),
  );

  // todo: timeout??
  // subscribe
  // eslint-disable-next-line no-unused-vars
  subscribe(`${deviceConnected}/+`, (d, t) => addConnection(getClientId(d)));
  // eslint-disable-next-line no-unused-vars
  subscribe(`${deviceDisconnected}/+`, (d, t) => removeConnection(getClientId(d)));

  return (
    <>
      <h3>IoT Devices:</h3>
      {connectedDevices.map(
        (device) => (
          <DeviceStatus
            key={device}
            deviceId={device}
          />
        ),
      )}
    </>
  );
}

export default ConnectedDevices;
