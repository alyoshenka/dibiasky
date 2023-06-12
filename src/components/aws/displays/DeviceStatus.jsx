import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@mui/material/Chip';
import { green } from '@mui/material/colors';
import { Box } from '@mui/material';

function DeviceStatus({ deviceId }) {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
    }}
    >
      <h4>
        {`${deviceId} Status: `}
      </h4>
      <Chip label="Connected" style={{ backgroundColor: green[500], alignSelf: 'center' }} />
    </Box>
  );
}

DeviceStatus.propTypes = {
  deviceId: PropTypes.string.isRequired,
};

export default DeviceStatus;
