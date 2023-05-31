import React, { useEffect, useState, useRef } from 'react';
import { subscribe } from '../../../utils/pubsub';
import { addEntryToLog } from '../../../utils/log';
import { deviceConnected, deviceDisconnected } from '../../../utils/topics';
import DeviceStatus from './DeviceStatus';

function ConnectedDevices() {
  const [connectedDevices, setConnectedDevices] = useState([]);
  let alreadySubscribed = false; // useState doesn't work, don't know why
  const devicesRef = useRef();
  devicesRef.current = connectedDevices;

  const getClientId = (payload) => payload.value.clientId;

  const addConnection = (clientId) => {
    if (!devicesRef.current.includes(clientId)) {
      setConnectedDevices((prevConnected) => [
        ...prevConnected, clientId,
      ]);
    } else {
      addEntryToLog('Unable to add connected device:', clientId);
    }
  };
  const removeConnection = (clientId) => setConnectedDevices(
    devicesRef.current.filter((id) => id !== clientId),
  );

  useEffect(() => {
    // todo: timeout??
    if (!alreadySubscribed) {
      alreadySubscribed = true;
      subscribe(`${deviceConnected}/+`, (d) => addConnection(getClientId(d)));
      subscribe(`${deviceDisconnected}/+`, (d) => removeConnection(getClientId(d)));
    }
  }, []);

  return (
    <>
      <h3>IoT Devices:</h3>
      {connectedDevices.map(
        (device) => (
          <DeviceStatus
            key={device} // change when devices are actually unique(?)
            deviceId={device}
          />
        ),
      )}
    </>
  );
}

export default ConnectedDevices;
