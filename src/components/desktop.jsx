'use strict'

import AddNoteButton from './add-note-button.jsx'
import Note from './note.jsx'

class Desktop extends GLOBAL.React.Component {
  constructor(props) {
    super(props)

    this.state = {
      notes: [
        {
          title: 'My First Note',
          note: 'This is a note. You can add, edit, drag, and remove notes. The notes are cached in localStorage, so if you refresh they\'ll still be there!'
        }
      ]
    }
  }

  static get defaultProps() {
    return {}
  }

  update() {

  }

  render() {
    return (
      <div className='desktop'>
        <AddNoteButton />
        {this.state.notes.map((note, i) => {
          return <Note {...note} key={i} />
        })}
      </div>
    )
  }

  renderNotes() {

  }
}

export default Desktop
