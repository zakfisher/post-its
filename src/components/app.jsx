'use strict'

import Reflux from 'reflux'

// Pages
import Home from '../pages/home.jsx'

class App extends GLOBAL.React.Component {
  constructor(props) {
    super(props)
  }

  static get defaultProps() {
    return (typeof window !== 'undefined') ? window.data : {}
  }

  render() {
    return <div id='app'><Home {...this.props} /></div>
  }
}

export default App
