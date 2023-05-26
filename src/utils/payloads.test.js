/* eslint-disable no-undef */
import { neopolitanUpdate } from './payloads';
import { hubbleCommandRes } from './topics';

test('Update operation is correctly built', () => {
  const expected = {
    responseTopic: hubbleCommandRes,
    module: 'neopolitan',
    subCommand: 'update',
    options: ['say', 'hello world'],
  };
  expect(neopolitanUpdate(['say', 'hello world'])).toStrictEqual(expected);
});
