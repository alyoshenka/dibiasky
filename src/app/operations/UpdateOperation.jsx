import React, { useState, useEffect, useRef } from 'react';
import { PropTypes } from 'prop-types';
import UpdateOperationValue from './UpdateOperationValue';

function UpdateOperation({ options }) {
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
  // todo: op
  const updateOptionsDict = (op, val) => {
    const newDict = {};
    Object.assign(newDict, dictRef.current);
    newDict[op] = val;
    setOptionsDict(newDict);
  };

  useEffect(() => {
    console.log(optionsDict);
  }, [optionsDict]);

  return (
    <ul>
      {options.map((op, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={idx} style={{ display: 'flex', flexDirection: 'row' }}>
          <UpdateOperationValue op={op} updateOptionsDict={updateOptionsDict} />
        </li>
      ))}
    </ul>
  );
}

UpdateOperation.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default UpdateOperation;
