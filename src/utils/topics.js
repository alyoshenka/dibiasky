/* eslint-disable no-multi-spaces */
// todo: organize this file + docstring

export const publish = 'pub_test';
export const subscribe = 'sub_test';

const command = 'cmd/neo';
const data = 'dt/neo';

const hubbleCommand = `${command}/hubble`;
export const hubbleCommandReq = `${hubbleCommand}/req`;
export const hubbleCommandRes = `${hubbleCommand}/res`;

const scheduleCommand = `${command}/schedule`;
export const scheduleCommandReq = `${scheduleCommand}/req`;
export const scheduleCommandRes = `${scheduleCommand}/res`;
const deleteScheduled = `${scheduleCommand}/del`;
export const deleteScheduledReq = `${deleteScheduled}/req`;
export const deleteScheduledRes = `${deleteScheduled}/res`;

const hubbleOperations = `${data}/operations/hubble`;
export const reqHubbleOperations = `${hubbleOperations}/req`;
export const resHubbleOperations = `${hubbleOperations}/res`;

const scheduledOperations = `${data}/scheduled`;
export const scheduledOperationsReq = `${scheduledOperations}/req`;
export const scheduledOperationsRes = `${scheduledOperations}/res`;

const presense = '$aws/events/presence';
export const deviceConnected    = `${presense}/connected`; // '+'
export const deviceDisconnected = `${presense}/disconnected`;
