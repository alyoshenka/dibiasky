import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@mui/material/Chip';
import { green } from '@mui/material/colors';

function DeviceStatus({ deviceId }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <h4>
        {`${deviceId} Status: `}
      </h4>
      <Chip label="Connected" style={{ backgroundColor: green[500], alignSelf: 'center' }} />
    </div>
  );
}

DeviceStatus.propTypes = {
  deviceId: PropTypes.string.isRequired,
};

export default DeviceStatus;
