import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  addEntryToLog,
  publish,
} from '../utils/utils';
import { scheduleCommandReq, scheduleCommandRes, hubbleCommandReq } from '../utils/topics';

function OperationScheduler({ operation }) {
  const [commandTime, setCommandTime] = useState('click to initialize');

  const updateCommandTime = () => {
    const oneMin = new Date(new Date().getTime() + 1 * 60000);
    setCommandTime(oneMin.toISOString());
    // updateOptionsDict('executeAt', oneMin.toISOString());
  };

  const scheduleOperation = () => {
    addEntryToLog(`Scheduled operation for ${commandTime}`);
    const payload = {
      responseTopic: scheduleCommandRes,
      publishTopic: hubbleCommandReq,
      executeAt: commandTime,
      operation,
    };
    publish(scheduleCommandReq, payload);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Button style={{ alignSelf: 'flex-start' }} onClick={scheduleOperation} variant="contained">Run Later</Button>
      <div style={{ marginTop: '7%' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker label="Pick a time" />
        </LocalizationProvider>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p><b>{commandTime}</b></p>
        <Button onClick={updateCommandTime}>1 minute from now</Button>
      </div>
    </div>
  );
}

OperationScheduler.propTypes = {
  operation: PropTypes.shape({
    module: PropTypes.string.isRequired,
    friendlyName: PropTypes.string.isRequired,
    subCommand: PropTypes.string,
    data: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default OperationScheduler;
