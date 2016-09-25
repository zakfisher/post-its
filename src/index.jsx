'use strict'

/*
  This is the client-side entry point.
*/

import Client from './services/client.js'
import App from './components/app.jsx'

GLOBAL.ReactDOM.render(
  <App />,
  document.querySelector('#app')
)
