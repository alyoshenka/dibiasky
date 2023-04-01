/* eslint-disable no-console */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Button } from '@aws-amplify/ui-react';
import { Hub } from 'aws-amplify';
import { CONNECTION_STATE_CHANGE } from '@aws-amplify/pubsub';

function ConnectionStatus() {
  const [connectionState, setConnectionState] = useState(undefined);

  useEffect(() => {
    // todo: abstract into a function
    Hub.listen('pubsub', (data) => {
      const { payload } = data;
      if (payload.event === CONNECTION_STATE_CHANGE) {
        setConnectionState(payload.data.connectionState);
      }
    });   
  }, []);

  return (
    <div>
      <p>ConnectionState: {connectionState === undefined ? 'undefined' : connectionState}</p>
    </div>
  );
}

export default ConnectionStatus;