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
      return _.extend({}, Notes.Model, { id })
    }

    componentDidMount() {
      let newState = _.extend({}, this.props)
      newState.classes = ['note']

      // If new note, open in edit mode
      if (this.props.new) {
        newState.classes.push('edit')
      }

      const { translateX, translateY, translateZ } = this.props
      this.setPosition(translateX, translateY, translateZ)
      this.setState(newState)
    }

    delete() {
      Notes.Actions.deleteNote(this.state.id)
    }

    enterEditMode() {
      Notes.Actions.editNote(this.state.id)
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

    drag(e) {
      if (!this.dragging) return
      const { movementX, movementY } = e.nativeEvent
      this.currentX += movementX
      this.currentY += movementY
      this.setPosition(this.currentX, this.currentY, 0)
    }

    startDrag() {
      this.dragging = true
      const { translateX, translateY, translateZ } = this.state
      this.setPosition(translateX, translateY, translateZ)
      this.setState({
        classes: ['note', 'dragging']
      })
    }

    stopDrag() {
      if (!this.dragging) return
      this.dragging = false
      this.setState({
        classes: ['note'],
        translateX: this.currentX,
        translateY: this.currentY
      }, this.save)
    }

    save() {
      console.log('save time', this.state)
      Notes.Actions.saveNote(this.state)
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
              <p>{this.state.text}</p>
            </div>
            <div className='close-icon' onClick={this.delete.bind(this)} />
            <div className='edit-icon' onClick={this.enterEditMode.bind(this)} />
            <div className={`drag-icon${this.dragging ? ' active' : ''}`} />
          </div>

          <div className='back'>
            <div className='close-icon' onClick={this.exitEditMode.bind(this)} />
            <input name='title' placeholder='Title' value={this.state.title} />
            <textarea name='text' placeholder='Text' value={this.state.text} />
            <div className='cancel-button' onClick={this.exitEditMode.bind(this)}>
              Cancel
            </div>
            <div className='save-button' onClick={this.save.bind(this)}>
              Save
            </div>
          </div>

        </div>
      )
    }
  }
}

export default Note
