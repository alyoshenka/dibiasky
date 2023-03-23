/* eslint-disable no-console */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Button } from '@aws-amplify/ui-react';
import { listenForConnectionStateChanges } from './utils';

function Tester() {
  // eslint-disable-next-line no-unused-vars
  const [incr, setIncr] = useState(0);
  const [connectionState, setConnectionState] = useState(undefined);

  useEffect(() => {
    console.log('useEffect');
    const thingy = async () => {
      const currentConnectionState = await listenForConnectionStateChanges();
      setConnectionState(currentConnectionState);
    };
    thingy();
  }, []);

  return (
    <div>
      <Button onClick={() => setIncr(incr + 1)}>Click: {incr}</Button>
      <p>ConnectionState: {connectionState === undefined ? 'undefined' : connectionState}</p>
    </div>
  );
}

export default Tester;
