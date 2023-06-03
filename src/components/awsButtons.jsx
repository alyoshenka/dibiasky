import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function AwsButtons() {
  return (
    <Stack direction="column" spacing={2} marginTop={3}>
      <Button style={{ minWidth: '90%', margin: '5%' }} href="/Subscriptions" variant="contained" color="primary">Active Subs</Button>
      <Button style={{ minWidth: '90%', margin: '5%' }} href="/Logs" variant="contained" color="primary">
        Logs
      </Button>
    </Stack>
  );
}
