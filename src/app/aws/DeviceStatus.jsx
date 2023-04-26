/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import Chip from '@mui/material/Chip';
import { green } from '@mui/material/colors';

// todo: this totally changes the logic
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
