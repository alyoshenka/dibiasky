/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Button } from '@aws-amplify/ui-react';
// import { listenForConnectionStateChanges } from './utils';

function Tester() {
  // eslint-disable-next-line no-unused-vars
  const [connectionState, setConnectionState] = useState(0);
  // setConnectionState(1);

  /*
  useEffect(() => {
    const thingy = async () => {
      const currentConnectionState = await listenForConnectionStateChanges();
      setConnectionState(currentConnectionState);
    };
    thingy();
  }, []);
  */

  /*
  useEffect(() => {
    setConnectionState(2);
  }, []);
  */

  return (
    <div>
      <p>Hello!</p>
      <Button onClick={() => setConnectionState(connectionState + 1)}>Click</Button>
      <p>{connectionState}</p>
    </div>
  );
}

export default Tester;
