import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { subscribe, publish } from '../../../utils/pubsub';
import { addEntryToLog } from '../../../utils/log';
import {
  deviceConnected,
  deviceDisconnected,
  heartbeatReq,
  heartbeatRes,
} from '../../../utils/topics';
import DeviceStatus from './DeviceStatus';

function ConnectedDevices() {
  const connectionStatus = useSelector((state) => state.connectionStatus);
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

      subscribe(heartbeatRes, (d) => addConnection(getClientId(d)));
    }
  }, []);

  useEffect(() => {
    if (connectionStatus.isConnected) {
      publish(heartbeatReq, null);
    }
  }, [connectionStatus.isConnected]);

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
