import React, { useState, useRef } from 'react';
import { PropTypes } from 'prop-types';
import UpdateOperationValue from './UpdateOperationValue';

function UpdateOperation({ options, setOptionsParent }) {
  const [optionsDict, setOptionsDict] = useState(options);
  const dictRef = useRef();
  dictRef.current = optionsDict;

  const updateOptionsDict = (op, val) => {
    console.log(`before dict: ${JSON.stringify(optionsDict)}`);
    console.log(`before options: ${JSON.stringify(options)}`);
    const newDict = {};
    Object.assign(newDict, dictRef.current);
    newDict[op] = val;
    setOptionsDict(newDict);
    setOptionsParent(newDict);
    console.log(`after dict: ${JSON.stringify(newDict)}`);
    console.log(`after options: ${JSON.stringify(options)}`);
  };

  const updateOperationValuesList = () => {
    const listItems = [];
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    Object.keys(options).forEach((key) => {
      const li = (
        <li style={{ display: 'flex', flexDirection: 'row' }} key={key}>
          <UpdateOperationValue op={key} updateOptionsDict={updateOptionsDict} />
        </li>
      );
      listItems.push(li);
    });
    return listItems;
  };

  return (
    <ul>
      {updateOperationValuesList()}
    </ul>
  );
}

UpdateOperation.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  options: PropTypes.object,
  setOptionsParent: PropTypes.func.isRequired,
};

UpdateOperation.defaultProps = {
  options: {},
};

export default UpdateOperation;
