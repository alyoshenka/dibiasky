import React from 'react';
import { PropTypes } from 'prop-types';

function UpdateOperation({ options }) {
  return (
    <ul>
      {options.map((op) => <li>{op}</li>)}
    </ul>
  );
}

UpdateOperation.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default UpdateOperation;
