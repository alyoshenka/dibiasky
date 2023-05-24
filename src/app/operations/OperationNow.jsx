import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import UpdateOperation from './UpdateOperation';
import { mapCommandToFunction } from '../utils/commandOperations';

// eslint-disable-next-line no-unused-vars
function OperationNow({ operation, setOperation }) {
  const [options, setOptions] = useState(operation.options);
  const optionsRef = useRef();
  optionsRef.current = options;

  const operationWithOptions = () => {
    // todo: this seems like bad code. fix
    const withOps = {};
    Object.assign(withOps, operation);
    withOps.options = optionsRef.current;
    return () => mapCommandToFunction(withOps)();
  };

  /*
  useEffect(() => {
    // todo: this seems like bad code. fix
    const withOps = {};
    Object.assign(withOps, operation);
    withOps.options = optionsRef.current;
    setOperation(withOps);
  }, [options]);
  */

  useEffect(() => {
    setOptions(operation.options);
    console.log(`Op now: ${JSON.stringify(operation)}`);
  }, []);

  return (
    <div style={{ marginRight: '8%' }}>
      <Button onClick={() => { operationWithOptions()(); }} variant="contained">Run Now</Button>
      <UpdateOperation options={operation.options ?? {}} setOptionsParent={setOptions} />
    </div>
  );
}

OperationNow.propTypes = {
  operation: PropTypes.shape({
    module: PropTypes.string.isRequired,
    friendlyName: PropTypes.string.isRequired,
    subCommand: PropTypes.string,
    data: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    options: PropTypes.object,
  }).isRequired,
  setOperation: PropTypes.func.isRequired,
};

export default OperationNow;
