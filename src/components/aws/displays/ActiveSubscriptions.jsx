import React from 'react';
import { useSelector } from 'react-redux';

function ActiveSubscriptions() {
  const subs = useSelector((state) => state.subs);

  const renderedSubs = subs.map((sub, idx) => (
    // eslint-disable-next-line react/no-array-index-key
    <li key={idx}>
      {sub.route}
    </li>
  ));

  return (
    <>
      <h3>Subscriptions:</h3>
      <ul>
        {renderedSubs}
      </ul>
    </>
  );
}

export default ActiveSubscriptions;
