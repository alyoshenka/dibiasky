import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import OperationNow from './OperationNow';
import OperationScheduler from './OperationScheduler';

function OperationRunner({ selectedOperation }) {
  // eslint-disable-next-line no-unused-vars
  const [operation, setOperation] = useState(selectedOperation);

  useEffect(() => {
    console.log(`Runner selected: ${JSON.stringify(selectedOperation)}`);
    setOperation(selectedOperation);
  }, [selectedOperation]);

  useEffect(() => {
    console.log(`Runner oper: ${JSON.stringify(operation)}`);
  }, [operation]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <OperationNow operation={operation} setOperation={setOperation} />
      <OperationScheduler operation={operation} />
    </div>
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
