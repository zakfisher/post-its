'use strict'

const { Link } = GLOBAL.ReactRouter

const NavLogo = (props) => {
  return <Link className='nav-logo' to='/' />
}

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
        <NavLogo />
        <h1>{this.props.title}</h1>
      </nav>
    )
  }
}

export default Nav
