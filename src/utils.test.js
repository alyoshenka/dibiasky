/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import { Amplify, Auth } from 'aws-amplify';
import {
  returnOne,
  publish, subscribe,
  setupAmplify,
  getCurrentCredentials,
  getEndpoint,
  // displayConnectionStateChanges,
} from './utils';
import awsExports from './aws-exports';

jest.setTimeout(10000); // 10s
beforeAll(() => {
  Amplify.configure(awsExports);
  setupAmplify();
  // displayConnectionStateChanges();
  // subscribe('test', (d, t) => { console.log('idk'); });
});

// https://legacy.reactjs.org/docs/testing-recipes.html

test('Return One returns 1', () => {
  expect(returnOne()).toBe(1);
});

/*
test('Cognito identity is defined', async () => {
  // eslint-disable-next-line no-promise-executor-return
  await new Promise(() => setTimeout(5000)); // getting ConnectionDisrupted
  const cognitoIdentityId = await getCurrentCredentials();
  console.log('End:', getEndpoint());
  console.log('Cog:', await getCurrentCredentials());
  expect(await getCurrentCredentials()).not.toBe(undefined);
});
*/
