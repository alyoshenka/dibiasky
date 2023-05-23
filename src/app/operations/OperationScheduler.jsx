import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import {
  addEntryToLog,
  publish,
  parseISOString,
} from '../utils/utils';
import { scheduleCommandReq, scheduleCommandRes, hubbleCommandReq } from '../utils/topics';

function OperationScheduler({ operation }) {
  const [commandTime, setCommandTime] = useState('Click to initialize');
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const dateRef = useRef();
  dateRef.current = selectedDateTime;

  const dateInPast = () => Date.parse(dateRef.current) - Date.parse(new Date()) < 0;

  const isValidDate = (date) => date.toString() !== 'Invalid Date';

  const updateDateTimeValues = (datetime) => {
    setSelectedDateTime(dayjs(datetime));
  };

  const oneMinuteAhead = () => {
    const oneMin = new Date(new Date().getTime() + 1 * 60000);
    oneMin.setMilliseconds(0);
    oneMin.setSeconds(0);
    setCommandTime(oneMin.toISOString());
    updateDateTimeValues(oneMin);
    // updateOptionsDict('executeAt', oneMin.toISOString());
  };

  const updateDate = (date) => {
    const obj = new Date(date.$d);
    let newDate = parseISOString(commandTime);
    if (!isValidDate(newDate)) {
      newDate = new Date();
      // clear time setting
      newDate.setHours(0);
      newDate.setMinutes(0);
      newDate.setSeconds(0);
      newDate.setMilliseconds(0);
    }
    newDate.setDate(obj.getDate());
    newDate.setMonth(obj.getMonth());
    newDate.setYear(obj.getFullYear());
    setCommandTime(newDate.toISOString());
    updateDateTimeValues(newDate);
  };

  const updateTime = (time) => {
    let obj = new Date(time.$d);
    let newTime = parseISOString(commandTime);
    if (!isValidDate(newTime)) {
      newTime = new Date(); // initialize to current date
      newTime.setMilliseconds(0);
      newTime.setSeconds(0);
    }
    if (!isValidDate(obj)) {
      obj = new Date(); // initialize to current date
    }
    newTime.setHours(obj.getHours());
    newTime.setMinutes(obj.getMinutes());
    setCommandTime(newTime.toISOString());
    updateDateTimeValues(newTime);
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
          <DatePicker label="Pick a date" onChange={(val) => updateDate(val)} value={selectedDateTime} />
          <TimePicker label="Pick a time" onChange={(val) => updateTime(val)} value={selectedDateTime} timeSteps={{ minutes: 1 }} />
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
        <p>{dateInPast(selectedDateTime) ? 'The date you have selected is in the past. Are you really sure you want to do that?' : null}</p>
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
