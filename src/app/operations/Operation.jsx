import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import UpdateOperation from './UpdateOperation';
import { mapCommandToFunction } from '../utils/commandOperations';

function Operation({ operation }) {
  const [options, setOptions] = useState({});
  const optionsRef = useRef();
  optionsRef.current = options;

  const operationWithOptions = () => {
    // todo: this seems like bad code. fix
    const withOps = {};
    Object.assign(withOps, operation);
    withOps.options = optionsRef.current;
    return () => mapCommandToFunction(withOps)();
  };

  return (
    <div>
      <Button onClick={() => { operationWithOptions()(); }}>
        {operation.friendlyName}
      </Button>
      {/* todo: this is bad */}
      {operation.options
        ? <UpdateOperation options={operation.options} setOptionsParent={setOptions} />
        : null}
    </div>
  );
}

Operation.propTypes = {
  operation: PropTypes.shape({
    module: PropTypes.string.isRequired,
    friendlyName: PropTypes.string.isRequired,
    subCommand: PropTypes.string,
    data: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default Operation;
