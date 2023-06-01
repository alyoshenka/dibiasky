import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import DrawerButtons from './drawerButtons';

export default function OperationsDrawer() {
  return (
    <Box>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: '15%',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: '15%', boxSizing: 'border-box', bgcolor: '#9e9e9e',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <DrawerButtons />
        </Box>
      </Drawer>
    </Box>
  );
}