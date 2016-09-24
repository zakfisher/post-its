'use strict'

import Reflux from 'reflux'
import ClientRoutes from '../services/client-routes'

// Pages
import Home from '../pages/home.jsx'
import Note from '../pages/note.jsx'

class App extends GLOBAL.React.Component {
  constructor(props) {
    super(props)
    this.mixins = Reflux.connect([ClientRoutes.Store], 'router')

    // Set default page (from server)
    this.currentPage = this.props.page
    const defaultPage = this.getPage(this.currentPage, this.props)
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
    switch (page) {
      case 'note':
        return <Note {...props} />
      default:
        return <Home {...props} />
    }
  }

  componentDidMount() {
    ClientRoutes.Store.listen(this.update.bind(this))
  }

  update(data) {
    switch (data.action) {
      case 'go to page':
        // Set page from client
        if (this.currentPage = data.page) break;
        this.currentPage = data.page
        const newPage = this.getPage(this.currentPage, data.params)
        this.setState({ page: newPage })
        break;
    }
  }

  render() {
    return <div id='app'>{this.state.page}</div>
  }
}

export default App
