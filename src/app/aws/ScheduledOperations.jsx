import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { subscribe, publish, addEntryToLog } from '../utils/utils';
import { scheduledOperationsReq, scheduledOperationsRes } from '../utils/topics';

function ScheduledOperations({ isConnected }) {
  const [scheduledDB, setScheduledDB] = useState([]);

  useEffect(() => {
    if (isConnected) {
      setScheduledDB(['something']);

      // eslint-disable-next-line no-unused-vars
      subscribe(scheduledOperationsRes, (data, topic) => {
        if (data && data.value && data.scheduledOperations) {
          setScheduledDB(data.value.scheduledOperations);
          addEntryToLog('Received Scheduled Operations');
        } else {
          addEntryToLog('Received bad Scheduled Operations');
        }
      });
      publish(scheduledOperationsReq, null);
    }
  }, [isConnected]);
  return (
    <div>
      <p>scheduled operations</p>
      <ul>
        {/* eslint-disable-next-line react/no-array-index-key */}
        {scheduledDB.map((sched, idx) => <li key={idx}>{sched}</li>)}
      </ul>
    </div>
  );
}

ScheduledOperations.propTypes = {
  isConnected: PropTypes.bool.isRequired,
};

export default ScheduledOperations;
