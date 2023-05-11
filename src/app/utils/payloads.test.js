/* eslint-disable no-undef */
import { neopolitanUpdate } from './payloads';
import { hubbleCommandRes } from './topics';

test('Update operation is correctly built', () => {
  const expected = {
    topic: hubbleCommandRes,
    action: {
      cmd: 'neopolitan',
      data: 'update',
      options: ['say', 'hello world'],
    },
  };
  expect(neopolitanUpdate(['say', 'hello world'])).toStrictEqual(expected);
});
