import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { subscribe, addEntryToLog, requestHubbleOperations } from '../utils/utils';
import { resHubbleOperations } from '../utils/topics';

/*
When to get available operations?
1. On startup
2. On publish to "operations ready for query" topic
    Or just subscribe and make sure Neo publishes on startup
      That's way easier
*/

function AvailableOperations({ isConnected }) {
  const [operations, setOperations] = useState([]);

  // subscribe to operations response
  useEffect(() => {
    setOperations([]);
    // eslint-disable-next-line no-unused-vars
    subscribe(resHubbleOperations, (d, t) => {
      const obj = JSON.parse(d.value).res; // todo: take out res?
      setOperations(obj);
      addEntryToLog('Received Hubble Operations');
    });
  }, []);
  // publish to request operations
  useEffect(() => {
    addEntryToLog('Connected: Requesting Hubble Operations');
    if (isConnected) { requestHubbleOperations(); }
  }, [isConnected]);

  return (
    <div>
      <h3>Available Operations</h3>
      <ul>
        {operations.map((opr, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={idx}>
            {opr.cmd}
            {': '}
            {opr.data}
          </li>
        ))}
      </ul>
    </div>
  );
}

AvailableOperations.propTypes = {
  isConnected: PropTypes.bool.isRequired,
};

export default AvailableOperations;
