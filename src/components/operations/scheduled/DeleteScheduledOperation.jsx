/* eslint-disable no-unreachable */
import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { addEntryToLog } from '../../../utils/log';
import { publish } from '../../../utils/pubsub';
// todo: subscribe to deletescheduledres
//  todo: isconnected should actually be a redux var
import { deleteScheduledReq } from '../../../utils/topics';

// eslint-disable-next-line no-unused-vars
function DeleteScheduledOperation({ scheduleID, stepFunctionName }) {
  const deleteOperation = async () => {
    // todo: deleteScheduledRes shows success, if necessary
    publish(deleteScheduledReq, { scheduleID, stepFunctionName });
    addEntryToLog(`Deleted ScheduledOperation ${scheduleID}`);
  };

  return (
    <IconButton onClick={() => deleteOperation(scheduleID)}>
      <DeleteIcon fontSize="small" />
    </IconButton>
  );
}

DeleteScheduledOperation.propTypes = {
  scheduleID: PropTypes.string.isRequired,
  stepFunctionName: PropTypes.string.isRequired,
};

export default DeleteScheduledOperation;
