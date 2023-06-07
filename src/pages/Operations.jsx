/* eslint-disable react/prop-types */
import * as React from 'react';
import { useState } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ResponsiveAppBar from '../components/appBar';
import OperationsDrawerButtons from '../components/operationsDrawerButtons';
import OperationRunner from '../components/operations/select/OperationRunner';
import ScheduledOperations from '../components/operations/scheduled/ScheduledOperations';

function OperationsPage() {
  const [selectedOperation, setSelectedOperation] = useState('');

  const handleOperationSelected = (operation) => {
    setSelectedOperation(operation);
  };
  return (
    <>
      <div>
        <ResponsiveAppBar />
      </div>
      <div>
        <OperationsDrawerButtons onOperationSelected={handleOperationSelected} />
      </div>
      <Box
        component="main"
        sx={{
          ml: '20%',
          mr: '5%',
          width: '75%',
          height: '100vh',
          bgcolor: 'white',
          padding: '5%',
        }}
      >
        <Box>
          <Typography textAlign="center">
            <h1>Operations</h1>
          </Typography>
          <Box
            comment="schedule"
            sx={{
              pb: 5,
              // bgcolor: 'yellow',
            }}
          >
            <ScheduledOperations />
            <Box sx={{
              // bgcolor: 'green',
              mt: 5,
            }}
            >
              {selectedOperation && (
                <>
                  <Divider
                    textAlign="center"
                    sx={{ marginBottom: '2%', paddingBottom: '10' }}
                  >
                    <h1>Run or Schedule Operation</h1>
                  </Divider>
                  <OperationRunner selectedOperation={selectedOperation} />
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default withAuthenticator(OperationsPage);
