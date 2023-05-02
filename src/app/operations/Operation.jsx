import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import UpdateOperation from './UpdateOperation';
import { mapCommandToFunction } from '../utils/commandOperations';

function Operation({ opr }) {
  return (
    <div>
      <Button onClick={() => { mapCommandToFunction(opr)(); }}>{opr.friendlyName}</Button>
      {opr.options ? <UpdateOperation options={opr.options} /> : null}
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
