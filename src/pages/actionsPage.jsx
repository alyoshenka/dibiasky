/* eslint-disable react/prop-types */
import * as React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ClippedDrawer from '../components/clippedDrawer';
import ResponsiveAppBar from '../components/appBar';
import ActiveSubscriptions from '../components/aws/displays/ActiveSubscriptions';
import ConnectedDevices from '../components/aws/displays/ConnectedDevices';
import Log from '../components/aws/displays/Log';
import AvailableOperations from '../components/operations/select/AvailableOperations';

function ActionsPage({ isConnectedToAWS }) {
  return (
    <>
      <div>
        <ResponsiveAppBar />
      </div>
      <div>
        <ClippedDrawer />
      </div>
      <Stack direction="row" marginTop={8}>
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
            <AvailableOperations isConnected={isConnectedToAWS} />
          </div>
        </Box>
        <Box
          sx={{ width: '100%', display: 'flex' }}
        >
          <div>
            <h1>AWS Stuff</h1>
            <ActiveSubscriptions />
            <ConnectedDevices />
            <Log />
          </div>
        </Box>
      </Stack>
    </>
  );
}

export default withAuthenticator(ActionsPage);
