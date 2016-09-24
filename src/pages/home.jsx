'use strict'

import Nav from '../components/nav.jsx'
import Desktop from '../components/desktop.jsx'

const Home = (props) => {
  return (
    <div className='row'>
      <Nav {...props} />
      <Desktop />
    </div>
  )
}

export default Home
