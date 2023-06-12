import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

export default function AwsButtons() {
  return (
    <Stack>
      <Box>
        <Button
          style={{
            minWidth: '90%',
            marginLeft: '5%',
            marginRight: '5%',
            marginBottom: '2%',
          }}
          href="/Subscriptions"
          variant="contained"
          color="primary"
        >
          Active Subs
        </Button>
        <Button
          style={{
            minWidth: '90%',
            marginLeft: '5%',
            marginRight: '5%',
            marginBottom: '2%',
          }}
          href="/Logs"
          variant="contained"
          color="primary"
        >
          Logs
        </Button>
      </Box>
    </Stack>
  );
}
