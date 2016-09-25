'use strict'

const { Link } = GLOBAL.ReactRouter

class EditIcon extends GLOBAL.React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static get defaultProps() {
    return {}
  }

  click() {
    console.log('click edit icon', this.props)
  }

  render() {
    return <Link to={`/note/${this.props.id}`} className='edit-icon' onClick={this.click.bind(this)} />
  }
}

export default EditIcon
