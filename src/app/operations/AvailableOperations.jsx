import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';
import {
  subscribe,
  addEntryToLog,
  requestHubbleOperations,
} from '../utils/utils';
import { resHubbleOperations, deviceDisconnected } from '../utils/topics';
import Operation from './Operation';

function AvailableOperations({ isConnected }) {
  // todo: take out
  const dummyOperations = [
    { friendlyName: 'do a thing (test)', cmd: 'run', data: 'no data necessary' },
    { friendlyName: 'do a different thing (test)', cmd: 'print', data: 'beepboop' }, // todo: dummy opr with opts?
  ];
  const [operations, setOperations] = useState(dummyOperations);
  const [selectedOperationIdx, setSelectedOperationIdx] = useState('');
  const [selectedOperation, setSelectedOperation] = useState(null); // todo: better way to do this

  const onOperationChanged = (event) => {
    setSelectedOperationIdx(event.target.value);
    setSelectedOperation(operations[event.target.value]);
  };

  // subscribe to operations response
  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    subscribe(resHubbleOperations, (d, t) => {
      const obj = JSON.parse(d.value).res; // todo: take out res?
      setOperations(obj);
      addEntryToLog('Received Hubble Operations');
    });
    // todo: issue #47; no wildcard disconnection subscription
    // subscribe to disconnection to know when to clear operations
    // eslint-disable-next-line no-unused-vars
    subscribe(`${deviceDisconnected}/+`, (d, t) => {
      setOperations(dummyOperations);
    });
  }, []);
  // publish to request operations
  useEffect(() => {
    // todo: document how this works/pubsub "flow"
    if (isConnected) {
      addEntryToLog('Connected: Requesting Hubble Operations');
      requestHubbleOperations();
    }
  }, [isConnected]);
  // clear selection when new operations are fetched
  useEffect(() => {
    setSelectedOperationIdx('');
    setSelectedOperation(null);
  }, [operations]);

  return (
    <div>
      <h3>Available Operations</h3>
      <div>
        <FormControl style={{ minWidth: '70%' }}>
          <InputLabel id="select-label">Select</InputLabel>
          <Select
            value={selectedOperationIdx}
            onChange={onOperationChanged}
            SelectProps={{
              native: true,
            }}
            labelId="select-label"
            label="Label" // make it so it doesn't cross border line. in theory.
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {operations?.map((opr, idx) => (
              <MenuItem value={idx} key={`${opr.cmd}-${opr.data}`}>{opr.friendlyName}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {selectedOperation
          ? <Operation opr={selectedOperation} /> : null}
      </div>
    </div>
  );
}

AvailableOperations.propTypes = {
  isConnected: PropTypes.bool.isRequired, // is connected to AWS
};

export default AvailableOperations;
