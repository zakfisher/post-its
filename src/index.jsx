'use strict'

/*
  This is the client-side entry point.
*/

import Client from './services/client.js'
import Routes from './services/client-routes'
import App from './components/app.jsx'

// Render client-side app
const { Router, Route, browserHistory, IndexRoute } = GLOBAL.ReactRouter

GLOBAL.ReactDOM.render(
  <Router history={browserHistory}>
    {Object.keys(Routes.routes).map((route, i) => {
      return <Route path={route} component={App} key={i} onEnter={Routes.Actions.change} />
    })}
  </Router>,
  document.querySelector('#app')
)
