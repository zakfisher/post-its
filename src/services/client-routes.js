'use strict'

/*
  This is the client-side App router.
  It hooks into React Router url changes.
*/

import Reflux from 'reflux'

let ClientRoutes = {}

ClientRoutes.routes = {
  '/': 'home',
  '/note/:id': 'note',
  '*': 'home'
}

ClientRoutes.Actions = Reflux.createActions([
  'change',
])

ClientRoutes.Store = Reflux.createStore({
  listenables: [ClientRoutes.Actions],
  init: function() {},
  data: {},
  onChange: function(nextState) {
    this.trigger({
      action: 'go to page',
      page: ClientRoutes.routes[nextState.routes[0].path] || 'home',
      params: nextState.params,
      nextState
    })
  },
})

export default ClientRoutes
