/* eslint-disable jsx-a11y/media-has-caption */
import * as React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ClippedDrawer from '../components/clippedDrawer';
import ResponsiveAppBar from '../components/appBar';

function ExamplesPage() {
  return (
    <>
      <div>
        <ResponsiveAppBar />
      </div>
      <div>
        <ClippedDrawer />
      </div>
      <Box
        component="main"
        sx={{
          ml: '20%',
          mr: '5%',
          width: '75%',
          height: '100vh',
          bgcolor: 'white',
          padding: '5%',
        }}
      >
        <Typography>
          <h1>This is the EXAMPLES page</h1>
        </Typography>
      </Box>
    </>
  );
}

export default withAuthenticator(ExamplesPage);
