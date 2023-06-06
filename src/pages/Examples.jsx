/* eslint-disable jsx-a11y/media-has-caption */
import * as React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import ClippedDrawer from '../components/clippedDrawer';
import ResponsiveAppBar from '../components/appBar';
import demo from '../components/demos/hello_world_demo.mov';
import demo2 from '../components/demos/alexi_victor_demo.mov';
import demo3 from '../components/demos/abcsDemo.mov';

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
        <Box>
          <Typography textAlign="center">
            <h1>Project Example</h1>
          </Typography>
          <Box>
            <video src={demo2} width="100%" height="200" controls="controls" autoPlay="true" loop="true" muted />
            <Divider
              textAlign="center"
              sx={{ marginBottom: '1%' }}
            >
              <h1>ABCs</h1>
            </Divider>
            <video src={demo3} width="100%" height="200" controls="controls" autoPlay="true" loop="true" muted />
            <Divider
              textAlign="center"
              sx={{ marginBottom: '1%' }}
            >
              <h1>Hello World</h1>
            </Divider>
            <video src={demo} width="100%" height="200" controls="controls" autoPlay="true" loop="true" muted />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default withAuthenticator(ExamplesPage);
