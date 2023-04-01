import React from 'react';
import { Amplify } from 'aws-amplify';
import awsExports from '../aws-exports';
import * as utils from './utils/utils';
import * as topics from './utils/topics';
import ActiveSubscriptions from './ActiveSubscriptions';

Amplify.configure(awsExports);

utils.setupAmplify();
utils.displayCurrentCredentials();
utils.displayConnectionStateChanges();
utils.displayAuthStateChanges();

// need this to keep the connection open
utils.subscribe(topics.hubbleCommandRes, utils.printData);

function AWS() {
  return (
    <>
      <h2>AWS Stuff</h2>
      <ActiveSubscriptions />
    </>
  );
}

export default AWS;
