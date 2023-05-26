/* eslint-disable jsx-a11y/media-has-caption */
import * as React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import demo from '../demo/hello_world_demo.mov';
import demo2 from '../demo/alexi_victor_demo.mov';
import demo3 from '../demo/capstone_demo.mp4';
import demo4 from '../demo/abcs_demo.mov';
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
      <Box component="main" sx={{ flexGrow: 1, pl: '20%', pr: '5%' }}>
        <Toolbar />
        <Typography paragraph>
          <h1>This is the examples page</h1>
        </Typography>
        <Box position="">
          <video src={demo2} width="700" height="200" controls="controls" autoPlay="true" loop="true" />
          <video src={demo3} width="700" height="200" controls="controls" autoPlay="true" loop="true" />
          <video src={demo4} width="700" height="200" controls="controls" autoPlay="true" loop="true" />
          <video src={demo} width="700" height="200" controls="controls" autoPlay="true" loop="true" />
        </Box>
      </Box>
    </>
  );
}

export default withAuthenticator(ExamplesPage);
