/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { subscribe, publish, addEntryToLog } from '../utils/utils';
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
      // publish(scheduledOperationsReq, null);
    }
  }, [isConnected]);

  useEffect(() => {
    const map = scheduledDB.map((sched, idx) => {
      const executionTime = () => (sched.executeAt ? sched.executeAt : 'No time given');
      const displayName = () => (sched.operation.friendlyName ? sched.operation.friendlyName : 'No operation given');
      const content = (
        <p>{`${executionTime()} : ${displayName()}`}</p>
      );
      // eslint-disable-next-line react/no-array-index-key
      return <li key={idx}>{content}</li>;
    });
    setOperationsMap(map);
  }, [scheduledDB]);
  return (
    <div>
      <h3>Scheduled Operations</h3>
      {operationsMap}
    </div>
  );
}

ScheduledOperations.propTypes = {
  isConnected: PropTypes.bool.isRequired,
};

export default ScheduledOperations;
