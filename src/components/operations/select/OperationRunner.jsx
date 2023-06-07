import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import OperationNow from './OperationNow';
import OperationScheduler from './OperationScheduler';

function OperationRunner({ selectedOperation }) {
  const [operation, setOperation] = useState(selectedOperation);

  useEffect(() => {
    setOperation(selectedOperation);
  }, [selectedOperation]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Box
        sx={{
          width: '50%',
        }}
      >
        <OperationNow operation={operation} setOperation={setOperation} />
      </Box>
      <Box
        sx={{
          mr: '10%',
        }}
      >
        <OperationScheduler operation={operation} />
      </Box>
    </Box>
  );
}

OperationRunner.propTypes = {
  selectedOperation: PropTypes.shape({
    module: PropTypes.string.isRequired,
    friendlyName: PropTypes.string.isRequired,
    subCommand: PropTypes.string,
    data: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    options: PropTypes.object,
  }),
};

OperationRunner.defaultProps = {
  selectedOperation: null,
};

export default OperationRunner;
