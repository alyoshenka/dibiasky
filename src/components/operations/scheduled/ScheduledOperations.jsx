/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import DeleteScheduledOperation from './DeleteScheduledOperation';
import { scheduledOperationsReq, scheduledOperationsRes } from '../../../utils/topics';
import { addEntryToLog } from '../../../utils/log';
import { publish, subscribe } from '../../../utils/pubsub';

function ScheduledOperations({ isConnected }) {
  const scheduledToTable = (operations) => {
    const optionsDictToDisplayStr = (sched) => JSON.stringify(sched.operation.options);
    const prettyDate = (date) => dayjs(date).format('MM/DD/YY hh:mm:ss A');
    const map = operations.map((sched, idx) => {
      // todo: display in a nicer output format
      const executionTime = sched.executeAt ? sched.executeAt : 'No time given';
      const displayName = sched.operation.friendlyName ? sched.operation.friendlyName : 'No operation given';
      return (
        // eslint-disable-next-line react/no-array-index-key
        <TableRow key={idx}>
          <TableCell>{prettyDate(executionTime)}</TableCell>
          <TableCell>{displayName}</TableCell>
          <TableCell>{optionsDictToDisplayStr(sched)}</TableCell>
          <TableCell>
            <DeleteScheduledOperation
              scheduleID={sched.scheduleID}
              stepFunctionName={sched.stepFunctionName}
            />
          </TableCell>
        </TableRow>
      );
    });
    return map;
  };
  const [scheduledDB, setScheduledDB] = useState([]);
  const [operationsMap, setOperationsMap] = useState(scheduledToTable([]));

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
    setOperationsMap(scheduledToTable(scheduledDB));
  }, [scheduledDB]);
  return (
    <div>
      <h3>Scheduled Operations</h3>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Execution Time</TableCell>
            <TableCell>Operation</TableCell>
            <TableCell>Data</TableCell>
            <TableCell />
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
