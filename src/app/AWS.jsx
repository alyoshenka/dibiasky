import React from 'react';
import { Amplify } from 'aws-amplify';
import awsExports from '../aws-exports';
import * as utils from './utils/utils';
import ActiveSubscriptions from './ActiveSubscriptions';

Amplify.configure(awsExports);

utils.setupAmplify();
utils.displayCurrentCredentials();
utils.displayConnectionStateChanges();
utils.displayAuthStateChanges();

// need this to keep the connection open
utils.subscribe('cmd/neo/res', utils.printData);

function AWS() {
  return (
    <>
      <h2>AWS Stuff</h2>
      <ActiveSubscriptions />
    </>
  );
}

export default AWS;
