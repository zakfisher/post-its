'use strict'

class PlusIcon extends GLOBAL.React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static get defaultProps() {
    return {}
  }

  render() {
    return (
      <div className={`plus-icon ${this.props.classes}`}>
        <div className='bar v'></div>
        <div className='bar h'></div>
      </div>
    )
  }
}

export default PlusIcon
