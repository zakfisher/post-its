'use strict'

import _ from 'lodash'
import Reflux from 'reflux'

import Notes from '../services/notes'

import AddNoteButton from './add-note-button.jsx'
import Note from './note.jsx'

class Desktop extends GLOBAL.React.Component {
  constructor(props) {
    super(props)

    this.mixins = Reflux.connect([Notes.Store], 'notes')

    this.state = {
      showOverlay: false,
      notes: []
    }
  }

  static get defaultProps() {
    return {}
  }

   componentDidMount() {
    Notes.Store.listen(this.update.bind(this))
    Notes.Actions.getAll()
  }

  update(data) {
    let NoteComponent = null
    let notes = []

    switch (data.action) {

      case 'get notes':
        this.setState({
          notes: data.notes.map((note, i) => {
            NoteComponent = new Note()
            return <NoteComponent {...note} key={i} />
          })
        })
        break

      case 'add note':
        NoteComponent = new Note()
        notes = this.state.notes.concat(<NoteComponent key={this.state.notes.length} isNew={true} />)
        this.setState({ notes })
      case 'edit note':
        this.setState({ showOverlay: true })
        break

      case 'show desktop':
        this.setState({ showOverlay: false })
        break

      case 'cancel new note':
        notes = this.state.notes.splice(0, (this.state.notes.length - 1))
        this.setState({ notes })
        break
    }
  }

  render() {
    return (
      <div className='desktop'>
        <AddNoteButton />
        {this.state.notes}
        <div className={`overlay${this.state.showOverlay ? ' show' : ''}`} />
        <p className='reset' onClick={Notes.Actions.reset}>Reset</p>
      </div>
    )
  }
}

export default Desktop
