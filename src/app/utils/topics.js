export const publish = 'pub_test';
export const subscribe = 'sub_test';

const hubbleCommand = 'cmd/neo/hubble';
export const hubbleCommandReq = `${hubbleCommand}/req`;
export const hubbleCommandRes = `${hubbleCommand}/res`;

const hubbleOperations = 'dt/neo/operations/hubble';
export const reqHubbleOperations = `${hubbleOperations}/req`;
export const resHubbleOperations = `${hubbleOperations}/res`;

export const deviceConnected = '$aws/events/presence/connected'; // '+'
export const deviceDisconnected = '$aws/events/presence/disconnected';
