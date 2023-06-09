import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { logs, subscriptions } from '../utils/pageLinks';

export default function AwsButtons() {
  return (
    <Stack>
      <Box>
        <Button style={{ minWidth: '90%', margin: '5%' }} href={subscriptions} variant="contained" color="primary">Active Subs</Button>
        <Button style={{ minWidth: '90%', margin: '5%' }} href={logs} variant="contained" color="primary">
          Logs
        </Button>
      </Box>
    </Stack>
  );
}
