import React from 'react';
import { useSelector } from 'react-redux';

function ActiveSubscriptions() {
  const subs = useSelector((state) => state.subs);

  const renderedSubs = subs.map((sub) => (
    <li>
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
