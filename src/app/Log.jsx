import React from 'react';
import { useSelector } from 'react-redux';

function Log() {
  const log = useSelector((state) => state.log);

  const renderedLog = log.map((entry, idx) => (
    // eslint-disable-next-line react/no-array-index-key
    <li key={idx}>
      {entry.route}
      {': '}
      {entry.msg}
    </li>
  ));

  return (
    <div id="log">
      <p>Log (actual)</p>
      <ul>
        {renderedLog}
      </ul>
    </div>
  );
}

export default Log;