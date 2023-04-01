/* eslint-disable no-console */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Button } from '@aws-amplify/ui-react';
import { Hub } from 'aws-amplify';
import { CONNECTION_STATE_CHANGE } from '@aws-amplify/pubsub';

function ConnectionStatus() {
  const logFormat = [
    'this thing happened',
    'then this thing happened',
    'and then this other thing happened',
  ];
  // eslint-disable-next-line no-unused-vars
  const [incr, setIncr] = useState(0);
  const [connectionState, setConnectionState] = useState(undefined);
  const [log, setLog] = useState(null);

  useEffect(() => {
    // todo: abstract into a function
    Hub.listen('pubsub', (data) => {
      const { payload } = data;
      if (payload.event === CONNECTION_STATE_CHANGE) {
        setConnectionState(payload.data.connectionState);
      }
    });   
  }, []);
  
  useEffect(() => {
    setLog(logFormat); 
  }, []);

  return (
    <div>
      <Button onClick={() => setIncr(incr + 1)}>Click: {incr}</Button>
      <p>ConnectionState: {connectionState === undefined ? 'undefined' : connectionState}</p>
      <div id="log" style={{ outline: '1px solid black', flex: 'flex-grow' }}>
        <p>Log</p>
        <ul>
          {log?.map((item, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={idx}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ConnectionStatus;
