/* eslint-disable react/prop-types */
import * as React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ClippedDrawer from '../components/clippedDrawer';
import ResponsiveAppBar from '../components/appBar';
import welcomeHome from '../components/demos/welcomHome.mov';
import neoProject from '../components/demos/NeoProject.mov';
import hardware from '../images/HardwareComponents.png';

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
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '1%',
              }}
            >
              <Box>
                <video src={welcomeHome} width="100%" height="200" autoPlay="true" loop="true" muted />
              </Box>
              <Box>
                <video src={neoProject} width="100%" height="200" autoPlay="true" loop="true" muted />
              </Box>
            </Box>
            <Typography textAlign="center">
              <h2>
                Home automation project - consisting of an led board
                synchronized with a react js app to display dynamic visuals.
              </h2>
              <h3>
                See hardware below - check out&nbsp;
                <Link href="/Operations" underline="hover">
                  operations
                </Link>
                &nbsp;to see project in action.
              </h3>
              <img src={hardware} className="hardware" alt="hardware" width="100%" />
            </Typography>
          </Box>
        </Box>
      </Stack>
    </>
  );
}

export default withAuthenticator(HomePage);
