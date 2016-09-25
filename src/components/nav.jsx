'use strict'

class Nav extends GLOBAL.React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pageTitle: '[Page Title]'
    }
  }

  static get defaultProps() {
    return {}
  }

  render() {
    return (
      <nav className='nav'>
        <div className='nav-logo' />
        <h1>{this.props.title}</h1>
      </nav>
    )
  }
}

export default Nav
