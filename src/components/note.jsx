'use strict'

import Reflux from 'reflux'
import UUID from 'uuid'
import _ from 'lodash'

import Notes from '../services/notes'

function Note() {
  const id = UUID.v4()

  return class Note extends GLOBAL.React.Component {
    constructor(props) {
      super(props)
      this.state = {
        id,
        classes: [],
        style: {},
        title: '',
        text: '',
        translateX: 0,
        translateY: 0,
        translateZ: 0,
      }
    }

    static get defaultProps() {
      return { id }
    }

    componentDidMount() {
      let newState = _.extend({}, this.props)
      newState.classes = ['note']

      // If new note, open in edit mode
      if (this.props.isNew) {
        newState.id = 'new'
        newState.classes.push('edit')
      }

      // Set initial position
      const { translateX, translateY, translateZ } = this.props
      this.setPosition(translateX, translateY, translateZ)

      this.setState(newState)
    }

    delete() {
      Notes.Actions.deleteNote(this.state.id)
    }

    enterEditMode() {
      Notes.Actions.editNote(this.state.id)
      this.refs.title.value = this.state.title
      this.refs.text.value = this.state.text
      this.setState({
        classes: ['note', 'edit']
      })
      this.setPosition(0, 0, 0)
    }

    exitEditMode() {
      Notes.Actions.showDesktop()

      // Cancel note if new
      if (this.state.id === 'new') {
        Notes.Actions.cancelNewNote()
      }

      // Close note if done editing
      else {
        const { translateX, translateY, translateZ } = this.state
        this.setPosition(translateX, translateY, translateZ)
        this.setState({
          classes: ['note']
        })
      }
    }

    setPosition(x, y, z) {
      this.currentX = x
      this.currentY = y
      this.setState({
        style: {
          transform: `translate3d(${x}px, ${y}px, ${z}px)`
        }
      })
    }

    // @TODO: make drag work in FF, Safari, IE
    drag(e) {
      if (!this.dragging) return
      this.dragged = true
      const { movementX, movementY } = e.nativeEvent
      this.currentX += movementX
      this.currentY += movementY
      this.setPosition(this.currentX, this.currentY, 0)
    }

    startDrag() {
      this.dragging = true
      this.dragged = false
      const { translateX, translateY, translateZ } = this.state
      this.setPosition(translateX, translateY, translateZ)
      this.setState({
        classes: ['note', 'dragging']
      })
    }

    stopDrag() {
      this.dragging = false
      if (!this.dragged) return
      this.dragged = false
      this.setState({
        classes: ['note'],
        translateX: this.currentX,
        translateY: this.currentY
      }, this.save)
    }

    save() {
      Notes.Actions.saveNote(this.state)
    }

    saveForm() {
      const noteId = this.state.demo ? 'demo' : id
      this.setState({
        id: noteId,
        title: this.refs.title.value,
        text: this.refs.text.value
      }, () => {
        this.save()
        this.exitEditMode()
      })
    }

    render() {
      return (
        <div className={this.state.classes.join(' ')} style={this.state.style}>

          <div className='front'
            onMouseMove={this.drag.bind(this)}
            onMouseDown={this.startDrag.bind(this)}
            onMouseUp={this.stopDrag.bind(this)}
            onMouseLeave={this.stopDrag.bind(this)}>
            <div className='title'>
              <h1>{this.state.title}</h1>
            </div>
            <div className='text'>
              <p dangerouslySetInnerHTML={{__html: this.state.text.replace(/\n/g, '<br />') }} />
            </div>
            <div className='close-icon' onClick={this.delete.bind(this)} />
            <div className='edit-icon' onClick={this.enterEditMode.bind(this)} />
            <div className={`drag-icon${this.dragging ? ' active' : ''}`} />
          </div>

          <div className='back'>
            <div className='close-icon' onClick={this.exitEditMode.bind(this)} />
            <form>
              <input ref='title' name='title' placeholder='Title' />
              <textarea ref='text' name='text' placeholder='Text' />
              <div className='cancel-button' onClick={this.exitEditMode.bind(this)}>Cancel</div>
              <div className='save-button' onClick={this.saveForm.bind(this)}>Save</div>
            </form>
          </div>

        </div>
      )
    }
  }
}

export default Note
