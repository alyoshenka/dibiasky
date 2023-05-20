import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  addEntryToLog,
  publish,
} from '../utils/utils';
import { scheduleCommandReq, scheduleCommandRes, hubbleCommandReq } from '../utils/topics';

function OperationScheduler({ operation }) {
  const [commandTime, setCommandTime] = useState('Click to initialize');

  const oneMinuteAhead = () => {
    const oneMin = new Date(new Date().getTime() + 1 * 60000);
    setCommandTime(oneMin.toISOString());
    // updateOptionsDict('executeAt', oneMin.toISOString());
  };

  const parseISOString = (s) => {
    const b = s.split(/\D+/);
    // eslint-disable-next-line no-plusplus
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  };

  const updateDate = (date) => {
    const obj = new Date(date.$d);
    const newDate = parseISOString(commandTime);
    newDate.setDate(obj.getDate());
    newDate.setMonth(obj.getMonth());
    newDate.setYear(obj.getFullYear());
    setCommandTime(newDate.toISOString());
  };

  const updateTime = (time) => {
    const obj = new Date(time.$d);
    const newTime = parseISOString(commandTime);
    newTime.setHours(obj.getHours());
    newTime.setMinutes(obj.getMinutes());
    setCommandTime(newTime.toISOString());
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
          {/* DateTimePicker was not allowing to select time */}
          <DatePicker label="Pick a date" onChange={(val) => updateDate(val)} />
          <TimePicker label="Pick a time" onChange={(val) => updateTime(val)} />
        </LocalizationProvider>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p>
          <b>{commandTime}</b>
          {'  ['}
          {parseISOString(commandTime).toString()}
          ]
        </p>
        <Button onClick={oneMinuteAhead}>1 minute from now</Button>
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
