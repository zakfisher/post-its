'use strict'

/*
  This file sets up server-side routes and sets
  default props for client/server App component.
*/

const _ = require('lodash')
// const Email =  require('./email')
// const Twitter = require('./twitter')

class ServerRoutes {
  constructor(router) {
    this.router = router
    // this.GET()
    // this.POST()
    this.pages()
  }

  // // Add GET Routes
  // GET() {
  //   var getRoutes = [
  //     { path: '/tweet', callback: Twitter.getLatestTweet() },
  //   ]
  //   getRoutes.forEach((route) => {
  //     this.router.get(route.path, route.callback)
  //   })
  // }

  // // Add POST Routes
  // POST() {
  //   var postRoutes = [
  //     { path: '/email',
  //       callback: (req, res) => {
  //         return Email.sendVisitorEmail(req, res)
  //       }
  //     },
  //   ]
  //   postRoutes.forEach((route) => {
  //     this.router.post(route.path, route.callback)
  //   })
  // }

  // Add Page Routes
  pages() {
    let html = './components/html'
    let defaultProps = {
      env: process.env.NODE_ENV,
      title: 'Zak Fisher',
      page: 'home',
      keys: ['env', 'title', 'page']
    }
    let props = {}

    // Note Page
    this.router.get('/note/:id', (req, res) => {
      props =  _.extend({}, defaultProps)
      res.render(html, _.extend(props, {
        page: 'note',
        id: req.params.id,
        keys: props.keys.concat(['id'])
      }))
    })

    // Home Page
    this.router.get('*', (req, res) => {
      res.render(html, defaultProps)
    })
  }
}

module.exports = ServerRoutes
