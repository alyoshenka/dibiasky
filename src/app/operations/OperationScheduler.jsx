import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function OperationScheduler() {
  const [commandTime, setCommandTime] = useState('click to initialize');

  const updateCommandTime = () => {
    const oneMin = new Date(new Date().getTime() + 1 * 60000);
    setCommandTime(oneMin.toISOString());
    // updateOptionsDict('executeAt', oneMin.toISOString());
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Button style={{ alignSelf: 'flex-start' }}>Schedule</Button>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDateTimePicker label="Pick a time" />
      </LocalizationProvider>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <TextField label={commandTime} />
        <Button onClick={updateCommandTime}>1 minute from now</Button>
      </div>
    </div>
  );
}

export default OperationScheduler;
