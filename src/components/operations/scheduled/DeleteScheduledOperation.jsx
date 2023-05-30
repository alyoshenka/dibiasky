import React from 'react';
import PropTypes from 'prop-types';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import {
  fromCognitoIdentityPool,
} from '@aws-sdk/credential-provider-cognito-identity';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { addEntryToLog } from '../../../utils/log';
import { publish } from '../../../utils/pubsub';
import { scheduledOperationsReq } from '../../../utils/topics';

// eslint-disable-next-line no-unused-vars
function DeleteScheduledOperation({ scheduleID, stepFunctionName }) {
  const deleteOperation = async (id) => {
    try {
      // todo: THIS IS BAD CODE there are so many errors associated with the way this is done
      const client = new DynamoDBClient({
        region: process.env.REACT_APP_REGION,
        credentials: fromCognitoIdentityPool({
          client: new CognitoIdentityClient({ region: process.env.REACT_APP_REGION }),
          identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
        }),
      });
      // const docClient = DynamoDBDocumentClient.from(client);
      const deleteCommand = new DeleteCommand({
        TableName: 'ScheduledOperations',
        Key: {
          scheduleID: id,
        },
      });
      client
        .send(deleteCommand)
        .then(() => {
          addEntryToLog(`Deleted ScheduledOperation ${id}`);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          publish(scheduledOperationsReq, null);
        });
    } catch (err) {
      console.log(`DynamoDB error: ${err}`);
    }
  };

  return (
    <IconButton onClick={() => deleteOperation(scheduleID)}><DeleteIcon fontSize="small" /></IconButton>
  );
}

DeleteScheduledOperation.propTypes = {
  scheduleID: PropTypes.string.isRequired,
  stepFunctionName: PropTypes.string.isRequired,
};

export default DeleteScheduledOperation;
