


import { 
    returnOne, 
    publish, subscribe, 
    setupAmplify, 
    listenForConnectionStateChanges, getCurrentCredentials } from './utils'

import awsExports from './aws-exports';
import { Amplify, Auth } from 'aws-amplify';



// jest.setTimeout(10000) // 10s
beforeAll(() => {
    Amplify.configure(awsExports);
    setupAmplify();

    listenForConnectionStateChanges();
    //getCurrentCredentials();
})


// https://legacy.reactjs.org/docs/testing-recipes.html

test('Return One returns 1', () => {
  expect(returnOne()).toBe(1);
});