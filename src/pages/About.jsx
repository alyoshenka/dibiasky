import * as React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import ClippedDrawer from '../components/clippedDrawer';
import ResponsiveAppBar from '../components/appBar';

function AboutPage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <ResponsiveAppBar />
      <ClippedDrawer />
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
        <Typography textAlign="center">
          <h1>About Project</h1>
        </Typography>
      </Box>
    </Box>
  );
}

export default withAuthenticator(AboutPage);
