/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { subscribe, addEntryToLog } from '../utils/utils';
import { hubbleConnected, hubbleDisconnected } from '../utils/topics';

function HubbleStatus() {
  const [isConnected, setIsConnected] = useState(false);

  const onConnected = (topic, payload) => {
    setIsConnected(true);
    addEntryToLog('Hubble connected'); // not working??
  };
  const onDisconnected = (topic, payload) => {
    setIsConnected(false);
    addEntryToLog('Hubble disconnected');
  };

  useEffect(() => {
    subscribe(hubbleConnected, onConnected);
    subscribe(hubbleDisconnected, onDisconnected);
  }, []);

  return (
    <h3>
      {'Hubble Status: '}
      {isConnected ? 'Connected' : 'Disconnected'}
    </h3>
  );
}

export default HubbleStatus;
