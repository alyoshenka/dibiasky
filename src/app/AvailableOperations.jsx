import React, { useEffect, useState } from 'react';
import { Button } from '@aws-amplify/ui-react';
import { subscribe, requestHubbleOperations } from './utils/utils';
import { hubbleOperations } from './utils/topics';

function AvailableOperations() {
  const [operations, setOperations] = useState([]);

  useEffect(() => {
    // 1. Subscribe to operations channel
    setOperations([]);
    // eslint-disable-next-line no-unused-vars
    subscribe(hubbleOperations, (d, t) => {
      const obj = JSON.parse(d.value).res;
      setOperations(obj);
    });
  }, []);
  return (
    <div>
      <Button onClick={requestHubbleOperations}>Get Available Operations</Button>
      <ul>
        {operations.map((opr, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={idx}>
            {opr.cmd}
            {': '}
            {opr.data}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AvailableOperations;