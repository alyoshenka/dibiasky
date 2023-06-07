/* eslint-disable react/prop-types */
import * as React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ClippedDrawer from '../components/clippedDrawer';
import ResponsiveAppBar from '../components/appBar';

function HomePage() {
  return (
    <>
      <div>
        <ResponsiveAppBar />
      </div>
      <div>
        <ClippedDrawer />
      </div>
      <Stack>
        <Box
          component="main"
          sx={{
            ml: '20%',
            mr: '5%',
            width: '75%',
            height: '100vh',
            bgcolor: '',
            padding: '5%',
          }}
        >
          <Box>
            <Typography textAlign="center">
              <h1>Project Overview</h1>
            </Typography>
          </Box>
        </Box>
      </Stack>
    </>
  );
}

export default withAuthenticator(HomePage);
