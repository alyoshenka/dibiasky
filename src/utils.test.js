


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

// https://stackoverflow.com/questions/64673996/testing-aws-cognito-from-jest-fails-but-the-same-code-in-a-component-works

test('Valid cognito auth', async () => {
    const credential = await getCurrentCredentials()
    console.log('cred:', credential)
    expect(credential).not.toBe(undefined)
})


// test can connect

/*
PubSub test - same as on Pi
1. subscribe to a topic
2. publish to that topic
3. assert that we get a response

4*. unsubscribe from topic
5*. assert that we are unsubscribed
*/


/*
// https://jestjs.io/docs/asynchronous
test('Can recieve a message', done => {
    const topic = 'test_sub_pub'
    const payload = {'message': 'test'}
    const callback = (data, topic) => {
        try {
            expect(data).toBe(payload)
            done()
        } catch (error) {
            done(error)
        }  
    }
    subscribe(topic, callback)
    publish(topic, payload) 
})
*/