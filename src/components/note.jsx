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
      const { translateX, translateY, translateZ } = this.props
      newState.classes = ['note']
      newState.style = {
        transform: `translate3d(${translateX}px, ${translateY}px, ${translateZ}px)`
      }
      if (this.props.new) {
        newState.id = 'new'
        newState.classes.push('edit')
      }
      console.log('set note state', newState)
      this.setState(newState)
    }

    delete() {
      Notes.Actions.deleteNote(this.state.id)
    }

    enterEditMode() {
      console.log('enter edit mode', this.state.id)
      Notes.Actions.editNote(this.state.id)

      this.setState({
        classes: ['note', 'edit'],
        style: {
          transform: 'translate3d(0,0,0)'
        }
      })
    }

    exitEditMode() {
      console.log('exit edit mode', this.state.id)
      Notes.Actions.showDesktop()

      // Cancel note if new
      if (this.state.id === 'new') {
        Notes.Actions.cancelNewNote()
      }

      // Close note if done editing
      else {
        this.setState({
          classes: ['note'],
          style: {
            transform: `translate3d(${this.state.translateX}px, ${this.state.translateY}px, ${this.state.translateZ}px)`
          }
        })
      }
    }

    startDrag() {
      console.log('start drag', this.state.id)
    }

    stopDrag() {
      console.log('stop drag', this.state.id)
    }

    save() {
      console.log('save note', this.state.id)
      // Notes.Actions.updateNote()
    }

    render() {
      // console.log('render note', this.props)
      return (
        <div className={this.state.classes.join(' ')} style={this.state.style}>

          <div className='front'>
            <div className='title'>
              <h1>{this.state.title}</h1>
            </div>
            <div className='text'>
              <p>{this.state.text}</p>
            </div>
            <div className='close-icon' onClick={this.delete.bind(this)} />
            <div className='edit-icon' onClick={this.enterEditMode.bind(this)} />
            <div className='drag-icon' onMouseDown={this.startDrag.bind(this)} onMouseUp={this.stopDrag.bind(this)} />
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
