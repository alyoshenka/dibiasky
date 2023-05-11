import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function AppBarButtons() {
  return (
    <Stack direction="row" spacing={2} mr={20}>
      <Button href="/" variant="contained" color="warning">Home</Button>
      <Button href="/aboutPage" variant="contained" color="success">
        About
      </Button>
      <Button href="/examplesPage" variant="contained" color="primary">
        Examples
      </Button>
      <Button href="/testPage" variant="contained" color="primary">
        Test Page
      </Button>
    </Stack>
  );
}
