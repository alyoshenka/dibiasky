import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function AppBarButtons() {
  return (
    <Stack direction="row" spacing={2} mr={10}>
      <Button href="/" variant="string" color="primary">Home</Button>
      <Button href="/About" variant="string" color="primary">
        About
      </Button>
      <Button href="/Examples" variant="string" color="primary">
        Examples
      </Button>
      <Button href="/Operations" variant="string" color="primary">
        Operations
      </Button>
    </Stack>
  );
}
