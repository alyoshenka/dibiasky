/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import { subscribe } from '../utils/pubsub';
import { resHubbleOperations, deviceDisconnected } from '../utils/topics';
import { addEntryToLog } from '../utils/log';
import { requestHubbleOperations } from '../utils/commandOperations';
import ConnectedDevices from './aws/displays/ConnectedDevices';
import AwsButtons from './awsButtons';

function OperationsDrawerButtons({ onOperationSelected }) {
  // todo: take out
  const dummyOperations = [
    {
      friendlyName: 'Test Schedule',
      module: 'test',
    },
    {
      friendlyName: 'Test Options',
      module: 'print',
      options: { 'dummy option 1': null, 'dummy option 2': null },
    },
  ];
  const connectionStatus = useSelector((state) => state.connectionStatus);
  const [operations, setOperations] = useState(dummyOperations);
  const [selectedOperationIdx, setSelectedOperationIdx] = useState('');

  const onOperationChanged = (event) => {
    const selectedIndex = event.target.value;
    setSelectedOperationIdx(selectedIndex);
    const selectedOperation = operations[selectedIndex];
    onOperationSelected(selectedOperation);
  };

  // subscribe to operations response
  useEffect(() => {
    subscribe(resHubbleOperations, (d) => {
      if (d && d.value && d.value.availableOperations) {
        setOperations(d.value.availableOperations);
        addEntryToLog('Received Hubble Operations');
      } else {
        addEntryToLog('Received bad Hubble Operations');
      }
    });
    // todo: issue #47; no wildcard disconnection subscription
    // subscribe to disconnection to know when to clear operations
    subscribe(`${deviceDisconnected}/+`, () => {
      setOperations(dummyOperations);
    });
  }, []);
  // publish to request operations
  useEffect(() => {
    // todo: document how this works/pubsub "flow"
    if (connectionStatus.isConnected) {
      addEntryToLog('Connected: Requesting Hubble Operations');
      requestHubbleOperations();
    }
  }, [connectionStatus]);
  // clear selection when new operations are fetched
  useEffect(() => {
    setSelectedOperationIdx('');
  }, [operations]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isButtonClick = event.target.closest('.MuiButtonBase-root') !== null;
      if (!isButtonClick) {
        setSelectedOperationIdx('');
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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
        <Box sx={{ display: 'flex', overflow: 'auto' }}>
          <div>
            <Typography align="center">
              <ConnectedDevices />
              <AwsButtons />
              <h3>Operations</h3>
            </Typography>
            <div>
              {operations?.map((opr, idx) => (
                <Button
                  key={opr.friendlyName}
                  onClick={() => onOperationChanged({ target: { value: idx } })}
                  style={{ minWidth: '90%', margin: '5%' }}
                  variant={selectedOperationIdx === idx ? 'contained' : 'contained'}
                  color={selectedOperationIdx === idx ? 'success' : 'primary'}

                >
                  {opr.friendlyName}
                </Button>
              ))}
            </div>
          </div>
        </Box>
      </Drawer>
    </Box>
  );
}

export default OperationsDrawerButtons;
