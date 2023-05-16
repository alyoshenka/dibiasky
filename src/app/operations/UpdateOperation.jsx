import React, { useState, useRef } from 'react';
import { PropTypes } from 'prop-types';
import { Button, TextField } from '@mui/material';
import UpdateOperationValue from './UpdateOperationValue';

function UpdateOperation({ options, setOptionsParent }) {
  const [commandTime, setCommandTime] = useState('click to initialize');
  const initialOptionsDict = () => {
    const obj = [];
    options.forEach((op) => {
      obj[op] = null;
    });
    return obj;
  };
  const [optionsDict, setOptionsDict] = useState(initialOptionsDict(options));
  const dictRef = useRef();
  dictRef.current = optionsDict;

  const updateOptionsDict = (op, val) => {
    const newDict = {};
    Object.assign(newDict, dictRef.current);
    newDict[op] = val;
    setOptionsDict(newDict);
    if (setOptionsParent) {
      setOptionsParent(newDict);
    }
  };

  const updateCommandTime = () => {
    const oneMin = new Date(new Date().getTime() + 1 * 60000);
    setCommandTime(oneMin.toISOString());
    updateOptionsDict('executeAt', oneMin.toISOString());
  };

  return (
    <>
      <ul>
        {options.map((op, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={idx} style={{ display: 'flex', flexDirection: 'row' }}>
            <UpdateOperationValue op={op} updateOptionsDict={updateOptionsDict} />
          </li>
        ))}
      </ul>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <TextField label={commandTime} />
        <Button onClick={updateCommandTime}>1 minute from now</Button>
      </div>
    </>
  );
}

UpdateOperation.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  setOptionsParent: PropTypes.func.isRequired,
};

/*
UpdateOperation.defaultProps = {
  setOptionsParent: null, // todo: bad?
};
*/

export default UpdateOperation;
