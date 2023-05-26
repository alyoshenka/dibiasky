import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function ColorButtons() {
  return (
    <Stack direction="column" spacing={2}>
      <Button href="/" variant="contained" color="warning">Home</Button>
      <Button href="/clippedDrawer" variant="contained" color="success">
        Clipped Drawer Page
      </Button>
      <Button href="/appBar" variant="contained" color="primary">
        App Bar
      </Button>
      <Button href="/actionsPage" variant="contained" color="secondary">
        Actions Page
      </Button>
    </Stack>
  );
}
