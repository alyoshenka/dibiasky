// todo: organize this file + docstring

export const getEndpoint = () => process.env.REACT_APP_AWS_PUBSUB_ENDPOINT;

export const parseISOString = (s) => {
  const b = s.split(/\D+/);
  // eslint-disable-next-line no-plusplus
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
};

// todo: take out
/** Dummy function to set up tests */
export const returnOne = () => 1;
