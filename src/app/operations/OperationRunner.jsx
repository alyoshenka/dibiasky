import React from 'react';
import PropTypes from 'prop-types';
import OperationNow from './OperationNow';
import OperationScheduler from './OperationScheduler';

function OperationRunner({ selectedOperation }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <OperationNow operation={selectedOperation} />
      <OperationScheduler operation={selectedOperation} />
    </div>
  );
}

OperationRunner.propTypes = {
  selectedOperation: PropTypes.shape({
    module: PropTypes.string.isRequired,
    friendlyName: PropTypes.string.isRequired,
    subCommand: PropTypes.string,
    data: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
  }),
};

OperationRunner.defaultProps = {
  selectedOperation: null,
};

export default OperationRunner;
