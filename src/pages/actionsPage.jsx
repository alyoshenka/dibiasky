import * as React from 'react';
// import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ClippedDrawer from '../components/clippedDrawer';
import ResponsiveAppBar from '../components/appBar';
// import UpdateDisplay from '../components/updateDisplay';
import AvailableOperations from '../app/aws/AvailableOperations';
// import ConnectionStatus from '../app/aws/ConnectionStatus';
import ActiveSubscriptions from '../app/aws/ActiveSubscriptions';
import ConnectedDevices from '../app/aws/ConnectedDevices';
import Log from '../app/aws/Log';

export default function ActionsPage() {
  return (
    <Stack direction="column">
      <div>
        <ResponsiveAppBar />
      </div>
      <div>
        <ClippedDrawer />
      </div>
      <Stack direction="row">
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pl: '20%',
            pr: '5%',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <Typography paragraph>
            <h1>This is the actions page</h1>
          </Typography>
          <div>
            <AvailableOperations />
          </div>
        </Box>
        <Box
          sx={{ width: '100%', display: 'flex' }}
        >
          <div>
            <h2>AWS Stuff</h2>
            <ActiveSubscriptions />
            <ConnectedDevices />
            <Log />
          </div>
        </Box>
      </Stack>
    </Stack>
  );
}
