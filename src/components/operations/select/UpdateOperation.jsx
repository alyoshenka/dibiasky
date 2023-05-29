import React from 'react';
import { PropTypes } from 'prop-types';
import UpdateOperationValue from './UpdateOperationValue';

function UpdateOperation({ options, setOptionsParent }) {
  const updateOptionsDict = (op, val) => {
    const newDict = {};
    Object.assign(newDict, options);
    newDict[op] = val;
    setOptionsParent(newDict);
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
