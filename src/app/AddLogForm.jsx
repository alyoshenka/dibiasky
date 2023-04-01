/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { logAdded } from './logSlice';

function AddLogForm() {
  const [route, setRoute] = useState('');
  const [msg, setMsg] = useState('');

  const dispatch = useDispatch();

  const onRouteChanged = (e) => setRoute(e.target.value);
  const onMsgChanged = (e) => setMsg(e.target.value);

  const onSaveLogClicked = () => {
    if (route && msg) {
      dispatch(
        logAdded({
          id: nanoid(),
          route,
          msg,
        }),
      );
      setRoute('');
      setMsg('');
    }
  };

  return (
    <section>
      <h2>Add a new Log Entry</h2>
      <form>
        <label htmlFor="logRoute">Log Route:</label>
        <input
          type="text"
          id="logRoute"
          name="logRoute"
          value={route}
          onChange={onRouteChanged}
        />
        <label htmlFor="logMsg">Log Message:</label>
        <input
          id="logMsg"
          name="logMsg"
          value={msg}
          onChange={onMsgChanged}
        />
        <button type="button" onClick={onSaveLogClicked}>Save Log</button>
      </form>
    </section>
  );
}

export default AddLogForm;
