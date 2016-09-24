'use strict'

class Sidebar extends GLOBAL.React.Component {
  constructor(props) {
    super(props)
  }

  static get defaultProps() {
    return {
      greeting: 'Hi, I\'m Zak.',
      p1: 'I\'m a full stack web developer, with a background in graphic design and event production.',
      p2: 'I like to make cool stuff.',
      p3: 'I\'d love to talk to you about your project, so shoot me an email with some details and I\'ll get back to you as soon as I can.',
      p4: 'Thanks for checking out my site, and I can\'t wait to work together!',
    }
  }

  render() {
    return (
      <aside className='sidebar'>
        <div className='inner'>
          <h1>{this.props.greeting}</h1>
          <p>{this.props.p1}</p>
          <p>{this.props.p2}</p>
          <p>{this.props.p3}</p>
          <p>{this.props.p4}</p>
        </div>
      </aside>
    )
  }
}

export default Sidebar
