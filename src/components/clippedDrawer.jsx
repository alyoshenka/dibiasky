import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import DrawerButtons from './drawerButtons';
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import ResponsiveAppBar from './appBar';

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
