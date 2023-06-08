import * as React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ClippedDrawer from '../components/clippedDrawer';
import ResponsiveAppBar from '../components/appBar';
import ActiveSubscriptions from '../components/aws/displays/ActiveSubscriptions';

function SubscriptionsPage() {
  return (
    <>
      <div>
        <ResponsiveAppBar />
      </div>
      <div>
        <ClippedDrawer />
      </div>
      <Box component="main" sx={{ flexGrow: 1, ml: '20%', mr: '5%' }}>
        <Toolbar />
        <Typography paragraph>
          <h1>This is the SUBS page</h1>
          <ActiveSubscriptions />
        </Typography>
      </Box>
    </>
  );
}

export default withAuthenticator(SubscriptionsPage);
