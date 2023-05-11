import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import UpdateOperation from './UpdateOperation';
import { mapCommandToFunction } from '../utils/commandOperations';

function Operation({ opr }) {
  const [options, setOptions] = useState({});
  const optionsRef = useRef();
  optionsRef.current = options;

  const operationWithOptions = () => {
    // todo: this seems like bad code. fix
    const withOps = {};
    Object.assign(withOps, opr);
    withOps.options = optionsRef.current;
    return () => mapCommandToFunction(withOps)();
  };

  return (
    <div>
      <Button onClick={() => { operationWithOptions()(); }}>
        {opr.friendlyName}
      </Button>
      {/* todo: this is bad */}
      {opr.options ? <UpdateOperation options={opr.options} setOptionsParent={setOptions} /> : null}
    </div>
  );
}

Operation.propTypes = {
  opr: PropTypes.shape({
    cmd: PropTypes.string.isRequired,
    data: PropTypes.string.isRequired,
    friendlyName: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default Operation;
