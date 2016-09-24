'use strict'

import Reflux from 'reflux'
import Notes from '../services/notes'

import AddNoteButton from './add-note-button.jsx'
import Note from './note.jsx'

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

  componentWillMount() {
    Notes.Actions.getNotes()
  }

  componentDidMount() {
    Notes.Store.listen(this.update.bind(this))
  }

  update(data) {
    console.log(data)
    switch (data.action) {
      case 'get notes':
        this.setState({ notes: data.notes })
        break;
    }
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
}

export default Desktop
