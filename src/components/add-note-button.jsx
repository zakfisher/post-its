'use strict'

import Reflux from 'reflux'

import Notes from '../services/notes'

class AddNoteButton extends GLOBAL.React.Component {
  constructor(props) {
    super(props)

    this.mixins = Reflux.connect([Notes.Store], 'notes')

    this.state = {
      style: {}
    }
  }

  static get defaultProps() {
    return {}
  }

  componentDidMount() {
    Notes.Store.listen(this.update.bind(this))
  }

  update(data) {
    switch(data.action) {
      case 'add note':
      case 'edit note':
        this.setState({ style: { display: 'none' } })
        break

      case 'show desktop':
        this.setState({ style: { display: 'block' } })
        break
    }
  }

  render() {
    return (
      <div className='add-note-button' style={this.state.style} onClick={Notes.Actions.addNote}>
        <div className='plus-icon'>
          <div className='bar v'></div>
          <div className='bar h'></div>
        </div>
      </div>
    )
  }
}

export default AddNoteButton
