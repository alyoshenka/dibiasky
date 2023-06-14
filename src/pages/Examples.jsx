/* eslint-disable jsx-a11y/media-has-caption */
import * as React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import ClippedDrawer from '../components/clippedDrawer';
import ResponsiveAppBar from '../components/appBar';
import helloworld from '../components/demos/hello_world_demo.mov';
import alexivictor from '../components/demos/alexi_victor_demo.mov';
import abcs from '../components/demos/abcsDemo.mov';

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
        <Typography textAlign="center">
          <h1>Project Example</h1>
        </Typography>
        <Box>
          <video src={alexivictor} width="100%" height="200" autoPlay="true" loop="true" muted />
          <Divider
            textAlign="center"
            sx={{ marginBottom: '1%' }}
          >
            <h1>ABCs</h1>
          </Divider>
          <video src={abcs} width="100%" height="200" autoPlay="true" loop="true" muted />
          <Divider
            textAlign="center"
            sx={{ marginBottom: '1%' }}
          >
            <h1>Hello World</h1>
          </Divider>
          <video src={helloworld} width="100%" height="200" autoPlay="true" loop="true" muted />
        </Box>
      </Box>
    </>
  );
}

export default withAuthenticator(ExamplesPage);
