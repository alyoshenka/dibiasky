import React, { useState } from 'react';
import { Button } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  addEntryToLog,
  publish,
} from '../utils/utils';
import { scheduleCommandReq, scheduleCommandRes, hubbleCommandReq } from '../utils/topics';

function OperationScheduler() {
  const [commandTime, setCommandTime] = useState('click to initialize');

  const updateCommandTime = () => {
    const oneMin = new Date(new Date().getTime() + 1 * 60000);
    setCommandTime(oneMin.toISOString());
    // updateOptionsDict('executeAt', oneMin.toISOString());
  };

  const scheduleOperation = () => {
    addEntryToLog(`Scheduled operation for ${commandTime}`);
    // todo: this should NOT go here. put it where it should go!
    const payload = {
      responseTopic: scheduleCommandRes,
      publishTopic: hubbleCommandReq,
      executeAt: commandTime,
      operation: {
        module: 'testScheduler',
      },
    };
    publish(scheduleCommandReq, payload);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Button style={{ alignSelf: 'flex-start' }} onClick={scheduleOperation}>Schedule</Button>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker label="Pick a time" />
      </LocalizationProvider>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p><b>{commandTime}</b></p>
        <Button onClick={updateCommandTime}>1 minute from now</Button>
      </div>
    </div>
  );
}

export default OperationScheduler;
