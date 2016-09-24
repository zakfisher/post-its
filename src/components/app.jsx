'use strict'

import Reflux from 'reflux'
import Router from '../services/client-routes'

// Pages
import Home from '../pages/home.jsx'
import Note from '../pages/note.jsx'

class App extends GLOBAL.React.Component {
  constructor(props) {
    super(props)
    this.mixins = Reflux.connect([Router.Store], 'router')

    // Set default page (from server)
    const defaultPage = this.getPage(this.props.page, this.props)
    this.state = { page: defaultPage }
  }

  static get defaultProps() {
    return (typeof window !== 'undefined') ? window.data : {}
  }

  /*
    Default page props come from server.
    All url changes on the client set new props from url params.
  */
  getPage(page, props) {
    const pages = {
      'home': Home,
      'note': Note,
    }
    const Page = pages[page]
    return <Page {...props} />
  }

  componentDidMount() {
    Router.Store.listen(this.update.bind(this))
  }

  update(data) {
    switch (data.action) {
      case 'go to page':
        // Set page from client
        const newPage = this.getPage(data.page, data.params)
        this.setState({ page: newPage })
        break;
    }
  }

  render() {
    return <div id='app'>{this.state.page}</div>
  }
}

export default App
