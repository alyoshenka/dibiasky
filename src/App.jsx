/* eslint-disable react/prop-types */
import React from 'react';
import './App.css';
import { withAuthenticator } from '@aws-amplify/ui-react';
// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css';
import { displayAuthStateChanges } from './utils/amplify';
import HomePage from './pages/Home';

displayAuthStateChanges();

/**  Homepage of the application */
function App() {
  return (
    <div>
      <HomePage />
    </div>
  );
}

export default withAuthenticator(App);
