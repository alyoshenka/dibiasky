import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material'; // todo: amplify button?
import {
  subscribe,
  addEntryToLog,
  requestHubbleOperations,
} from '../utils/utils';
import { mapCommandToFunction } from '../utils/commandOperations';
import { resHubbleOperations } from '../utils/topics';

const styles = {
  operationsButtons: {
    display: 'flex', flexDirection: 'column',
  },
};

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
    // todo: document how this works/pubsub "flow"
    addEntryToLog('Connected: Requesting Hubble Operations');
    if (isConnected) { requestHubbleOperations(); }
  }, [isConnected]);

  return (
    <div>
      <h3>Available Operations</h3>
      <div id="operations-buttons" style={styles.operationsButtons}>
        <Button>example</Button>
        <Button>example</Button>
        {operations.map((opr) => (
          <Button
            key={`${opr.cmd}${opr.data}`}
            onClick={() => { mapCommandToFunction(opr)(); }}
          >
            {opr.friendlyName ? opr.friendlyName : `${opr.cmd}: ${opr.data}` }
          </Button>
        ))}
      </div>
    </div>
  );
}

AvailableOperations.propTypes = {
  isConnected: PropTypes.bool.isRequired,
};

export default AvailableOperations;
