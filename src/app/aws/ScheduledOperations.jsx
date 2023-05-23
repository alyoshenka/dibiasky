/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import {
  fromCognitoIdentityPool,
} from '@aws-sdk/credential-provider-cognito-identity';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  subscribe,
  publish,
  addEntryToLog,
  getCurrentCredentials,
  parseISOString,
} from '../utils/utils';
import { scheduledOperationsReq, scheduledOperationsRes } from '../utils/topics';

function ScheduledOperations({ isConnected }) {
  const deleteOperation = async (id) => {
    // todo: THIS IS BAD CODE there are so many errors associated with the way this is done
    const client = new DynamoDBClient({
      region: process.env.REACT_APP_REGION,
      credentials: fromCognitoIdentityPool({
        client: new CognitoIdentityClient({ region: process.env.REACT_APP_REGION }),
        identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
      }),
    });
    const docClient = DynamoDBDocumentClient.from(client);
    const deleteCommand = new DeleteCommand({
      TableName: 'ScheduledOperations',
      Key: {
        scheduleID: id,
      },
    });
    client
      .send(deleteCommand)
      .then((data) => {
        addEntryToLog(`Deleted ScheduledOperation ${id}`);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        publish(scheduledOperationsReq, null);
      });
  };
  const defaultSchedState = [
    {
      executeAt: 'random time',
      operation: {
        friendlyName: 'op name',
      },
    },
    {
      executeAt: 'another time',
      operation: {
        friendlyName: 'another op name',
      },
    },
  ];
  const scheduledToTable = (operations) => {
    const map = operations.map((sched, idx) => {
      // todo: display in a nicer output format
      const executionTime = sched.executeAt ? sched.executeAt : 'No time given';
      const displayName = sched.operation.friendlyName ? sched.operation.friendlyName : 'No operation given';
      return (
        // eslint-disable-next-line react/no-array-index-key
        <TableRow key={idx}>
          <TableCell>{executionTime}</TableCell>
          <TableCell>{displayName}</TableCell>
          <TableCell>
            <IconButton onClick={() => deleteOperation(sched.scheduleID)}><DeleteIcon fontSize="small" /></IconButton>
          </TableCell>
        </TableRow>
      );
    });
    return map;
  };
  const [scheduledDB, setScheduledDB] = useState(defaultSchedState);
  const [operationsMap, setOperationsMap] = useState(scheduledToTable(defaultSchedState));

  useEffect(() => {
    if (isConnected) {
      // eslint-disable-next-line no-unused-vars
      subscribe(scheduledOperationsRes, (data, topic) => {
        if (data !== undefined
          && data.value !== undefined) {
          try {
            setScheduledDB(data.value.scheduledOperations);
            addEntryToLog('Received Scheduled Operations');
          } catch (err) {
            addEntryToLog(`Could not set schedule operations: ${err}`);
          }
        } else {
          addEntryToLog('Received bad Scheduled Operations');
        }
      });
      publish(scheduledOperationsReq, null);
    }
  }, [isConnected]);

  useEffect(() => {
    setOperationsMap(scheduledToTable(scheduledDB));
  }, [scheduledDB]);
  return (
    <div>
      <h3>Scheduled Operations</h3>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Execution Time</TableCell>
            <TableCell>Operation</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {operationsMap}
        </TableBody>
      </Table>
    </div>
  );
}

ScheduledOperations.propTypes = {
  isConnected: PropTypes.bool.isRequired,
};

export default ScheduledOperations;
