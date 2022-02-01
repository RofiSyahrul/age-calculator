/* eslint-disable no-console */
import React from 'react';
import ReactDom from 'react-dom';

import App from './app';

ReactDom.render(<App />, document.getElementById('index'));

if ('serviceWorker' in navigator && !__DEV__ && !IS_EXTENSION) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(() => {
        console.log('Service worker registered 😎 👌');
      })
      .catch(() => {
        console.log('Service worker registration failed 🤦');
      });
  });
}
