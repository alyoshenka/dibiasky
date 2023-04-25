/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { subscribe } from '../utils/utils';
import { deviceConnected, deviceDisconnected } from '../utils/topics';
import DeviceStatus from './DeviceStatus';

function ConnectedDevices() {
  const [connectedDevices, setConnectedDevices] = useState([]);
  let alreadySubscribed = false; // useState doesn't work, don't know why

  const getClientId = (payload) => payload.value.clientId;

  const addConnection = (clientId) => {
    if (!connectedDevices.includes(clientId)) {
      setConnectedDevices((prevConnected) => [
        ...prevConnected, clientId,
      ]);
    }
  };
  // eslint-disable-next-line no-unused-vars
  const removeConnection = (clientId) => setConnectedDevices(
    connectedDevices.filter((id) => id !== clientId),
  );

  useEffect(() => {
    // todo: timeout??
    if (!alreadySubscribed) {
      alreadySubscribed = true;
      // eslint-disable-next-line no-unused-vars
      subscribe(`${deviceConnected}/+`, (d, t) => addConnection(getClientId(d)));
      // eslint-disable-next-line no-unused-vars
      subscribe(`${deviceDisconnected}/+`, (d, t) => removeConnection(getClientId(d)));
    }
  }, []);

  return (
    <>
      <h3>IoT Devices:</h3>
      {connectedDevices.map(
        (device, idx) => (
          <DeviceStatus
            // eslint-disable-next-line react/no-array-index-key
            key={`${device}${idx}`} // change when devices are actually unique(?)
            deviceId={device}
          />
        ),
      )}
    </>
  );
}

export default ConnectedDevices;
