export const publish = 'pub_test';
export const subscribe = 'sub_test';

export const hubbleCommandReq = 'cmd/neo/req';
export const hubbleCommandRes = 'cmd/neo/res';

const hubbleOperations = 'dt/neo/operations';
export const reqHubbleOperations = `${hubbleOperations}/req`;
export const resHubbleOperations = `${hubbleOperations}/res`;

export const hubbleConnected = '$aws/events/presence/connected/Hubble'; // '+'
export const hubbleDisconnected = '$aws/events/presence/disconnected/Hubble';
