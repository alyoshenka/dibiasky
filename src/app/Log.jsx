import React from 'react';
import { useSelector } from 'react-redux';

function Log() {
  const log = useSelector((state) => state.log);

  const renderedLog = log.slice(-9).map((entry, idx) => (
    // eslint-disable-next-line react/no-array-index-key
    <li key={idx}>
      {entry}
    </li>
  ));

  return (
    <div id="log">
      <h3>MQTT Log:</h3>
      <ol>
        {renderedLog}
      </ol>
    </div>
  );
}

export default Log;
