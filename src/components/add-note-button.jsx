'use strict'

const { Link } = GLOBAL.ReactRouter

import PlusIcon from './plus-icon.jsx'

class AddNoteButton extends GLOBAL.React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static get defaultProps() {
    return {}
  }

  render() {
    return (
      <Link to='/note/add' className='add-note-button'>
        <PlusIcon />
      </Link>
    )
  }
}

export default AddNoteButton
