'use strict'

import Reflux from 'reflux'

import Nav from '../components/nav.jsx'
import Desktop from '../components/desktop.jsx'

class App extends GLOBAL.React.Component {
  constructor(props) {
    super(props)
  }

  static get defaultProps() {
    return (typeof window !== 'undefined') ? window.data : {}
  }

  render() {
    return (
      <div id='app'>
        <Nav {...this.props} />
        <Desktop {...this.props} />
      </div>
    )
  }
}

export default App
