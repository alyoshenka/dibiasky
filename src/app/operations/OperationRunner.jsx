import React from 'react';
import PropTypes from 'prop-types';
import Operation from './Operation';
// eslint-disable-next-line no-unused-vars
import OperationScheduler from './OperationScheduler';

function OperationRunner({ selectedOperation }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Operation operation={selectedOperation} />
      {/* <OperationScheduler /> */}
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
