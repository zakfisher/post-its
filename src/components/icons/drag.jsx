'use strict'

const { Link } = GLOBAL.ReactRouter

class DragIcon extends GLOBAL.React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static get defaultProps() {
    return {}
  }

  dragStart() {
    console.log('drag start', this.props)
  }

  dragStop() {
    console.log('drag stop', this.props)
  }

  render() {
    return <div className='drag-icon' onMouseDown={this.dragStart.bind(this)} onMouseUp={this.dragStop.bind(this)} />
  }
}

export default DragIcon
