'use strict'

import PlusIcon from './plus-icon.jsx'

const NoteCloseIcon = (props) => {
  return (
    <div className='note-close'>
      <PlusIcon classes='x-rotate' />
    </div>
  )
}

const NoteTitle = (props) => {
  return (
    <div className='note-title'>
      <h1>{props.title}</h1>
      <NoteCloseIcon />
    </div>
  )
}

const NoteFront = (props) => {
  return (
    <div className='note-front'>
      <NoteTitle {...props} />
      <p className='note-text'>{props.note}</p>
    </div>
  )
}

const NoteBack = (props) => {
  return (
    <div className='note-back'>
      <NoteTitle {...props} />
      <p className='note-text'>The Back..</p>
    </div>
  )
}

class Note extends GLOBAL.React.Component {
  constructor(props) {
    super(props)
    this.state = {
      classes: ['note']
    }
  }

  static get defaultProps() {
    return {
      title: '[title]',
      note: '[note]',
    }
  }

  click() {
    if (this.state.classes.indexOf('edit') > -1) this.setState({ classes: ['note'] })
    else this.setState({ classes: ['note', 'edit'] })
  }

  render() {
    return (
      <div className={this.state.classes.join(' ')} onClick={this.click.bind(this)}>
        <NoteFront {...this.props} />
        <NoteBack {...this.props} />
      </div>
    )
  }
}

export default Note
