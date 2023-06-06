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
            <h1>This is the home page</h1>
          </Typography>
        </Box>
      </Stack>
    </>
  );
}

export default withAuthenticator(HomePage);
