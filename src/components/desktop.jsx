'use strict'

import _ from 'lodash'
import Reflux from 'reflux'

import Notes from '../services/notes'

import AddNoteButton from './add-note-button.jsx'
import Note from './note/index.jsx'

class Desktop extends GLOBAL.React.Component {
  constructor(props) {
    super(props)

    this.mixins = Reflux.connect([Notes.Store], 'notes')

    this.state = {
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
    switch (data.action) {
      case 'get all notes':
        this.setState({ notes: data.notes })
        break
    }
  }

  render() {
    return (
      <div className='desktop'>
        <AddNoteButton />
        {this.renderNotes()}
      </div>
    )
  }

  renderNotes() {
    return this.state.notes.map((note, i) => {
      const NoteComponent = new Note()
      return <NoteComponent {...note} key={i} />
    })
  }
}

export default Desktop
