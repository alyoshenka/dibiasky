import * as React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ClippedDrawer from '../components/clippedDrawer';
import ResponsiveAppBar from '../components/appBar';
import Log from '../components/aws/displays/Log';

function LogsPage() {
  return (
    <>
      <div>
        <ResponsiveAppBar />
      </div>
      <div>
        <ClippedDrawer />
      </div>
      <Box component="main" sx={{ flexGrow: 1, pl: '20%', pr: '5%' }}>
        <Toolbar />
        <Typography paragraph>
          <h1>This is the LOGS page</h1>
          <Log />
        </Typography>
      </Box>
    </>
  );
}

export default withAuthenticator(LogsPage);
