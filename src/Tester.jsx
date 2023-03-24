/* eslint-disable no-console */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Button } from '@aws-amplify/ui-react';
import { Hub } from 'aws-amplify';
import { CONNECTION_STATE_CHANGE } from '@aws-amplify/pubsub';

function Tester() {
  // eslint-disable-next-line no-unused-vars
  const [incr, setIncr] = useState(0);
  const [connectionState, setConnectionState] = useState(undefined);

  useEffect(() => {
    Hub.listen('pubsub', (data) => {
      const { payload } = data;
      if (payload.event === CONNECTION_STATE_CHANGE) {
        setConnectionState(payload.data.connectionState);
      }
    });    
  }, []);

  return (
    <div>
      <Button onClick={() => setIncr(incr + 1)}>Click: {incr}</Button>
      <p>ConnectionState: {connectionState === undefined ? 'undefined' : connectionState}</p>
    </div>
  );
}

export default Tester;
