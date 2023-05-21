/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  subscribe,
  publish,
  addEntryToLog,
  parseISOString,
} from '../utils/utils';
import { scheduledOperationsReq, scheduledOperationsRes } from '../utils/topics';

function ScheduledOperations({ isConnected }) {
  const defaultSchedState = [
    {
      executeAt: 'random time',
      operation: {
        friendlyName: 'op name',
      },
    },
    {
      executeAt: 'another time',
      operation: {
        friendlyName: 'another op name',
      },
    },
  ];
  const [scheduledDB, setScheduledDB] = useState(defaultSchedState);
  const [operationsMap, setOperationsMap] = useState(<ul><li>No operations</li></ul>);

  useEffect(() => {
    if (isConnected) {
      // eslint-disable-next-line no-unused-vars
      subscribe(scheduledOperationsRes, (data, topic) => {
        if (data !== undefined
          && data.value !== undefined) {
          try {
            setScheduledDB(data.value.scheduledOperations);
            addEntryToLog('Received Scheduled Operations');
          } catch (err) {
            addEntryToLog(`Could not set schedule operations: ${err}`);
          }
        } else {
          addEntryToLog('Received bad Scheduled Operations');
        }
      });
      publish(scheduledOperationsReq, null);
    }
  }, [isConnected]);

  useEffect(() => {
    const map = scheduledDB.map((sched, idx) => {
      const niceDate = (date) => parseISOString(date).toLocaleString('en-US');
      const executionTime = sched.executeAt ? niceDate(sched.executeAt) : 'No time given';
      const displayName = sched.operation.friendlyName ? sched.operation.friendlyName : 'No operation given';
      return (
        // eslint-disable-next-line react/no-array-index-key
        <TableRow key={idx}>
          <TableCell>{executionTime}</TableCell>
          <TableCell>{displayName}</TableCell>
        </TableRow>
      );
    });
    setOperationsMap(map);
  }, [scheduledDB]);
  return (
    <div>
      <h3>Scheduled Operations</h3>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Execution Time</TableCell>
            <TableCell>Operation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {operationsMap}
        </TableBody>
      </Table>
    </div>
  );
}

ScheduledOperations.propTypes = {
  isConnected: PropTypes.bool.isRequired,
};

export default ScheduledOperations;
