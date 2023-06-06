import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ConnectedDevices from './aws/displays/ConnectedDevices';
import AwsButtons from './awsButtons';

export default function ClippedDrawer() {
  return (
    <Box>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: '15%',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: '15%', boxSizing: 'border-box', bgcolor: 'lightgray',
          },
        }}
      >
        <Toolbar />
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
        >
          <div>
            <Typography align="center">
              <ConnectedDevices />
              <AwsButtons />
              <h3>Operations</h3>
            </Typography>
          </div>
        </Box>
      </Drawer>
    </Box>
  );
}
