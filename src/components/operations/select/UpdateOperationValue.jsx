import React from 'react';
import { PropTypes } from 'prop-types';
import { TextField } from '@mui/material';

function UpdateOperationValue({ op, updateOptionsDict }) {
  const onChange = (event) => {
    updateOptionsDict(op, event.target.value);
  };

  return (
    <TextField
      label={op}
      variant="standard"
      onChange={onChange}
      style={{ marginLeft: 20 }}
    />
  );
}

UpdateOperationValue.propTypes = {
  op: PropTypes.string.isRequired,
  updateOptionsDict: PropTypes.func.isRequired,
};

export default UpdateOperationValue;
