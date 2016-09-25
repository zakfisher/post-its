'use strict'

import Reflux from 'reflux'
import UUID from 'uuid'
import _ from 'lodash'

import Front from './front.jsx'
import Back from './back.jsx'

import Notes from '../../services/notes'
import ClientRoutes from '../../services/client-routes'

function Note() {
  const id = UUID.v4()

  const NoteActions = Reflux.createActions([
    'enterEditMode',
    'exitEditMode',
    'startDrag',
    'stopDrag',
    'delete',
  ])

  const NoteStore = Reflux.createStore({
    listenables: [NoteActions],
    data: {},

    init: function() {},

    onDelete: function() {
      this.trigger({
        action: 'delete'
      })
    },

    onEnterEditMode: function() {
      this.trigger({
        action: 'enter edit mode'
      })
    },

    onExitEditMode: function() {
      this.trigger({
        action: 'exit edit mode'
      })
    },

    onStartDrag: function() {
      this.trigger({
        action: 'start drag'
      })
    },

    onStopDrag: function() {
      this.trigger({
        action: 'stop drag'
      })
    },
  })

  return class Note extends GLOBAL.React.Component {
    constructor(props) {
      super(props)

      this.mixins = [
        Reflux.connect([ClientRoutes.Store], 'router'),
        Reflux.connect(NoteStore, 'note-' + id),
      ]

      this.state = {
        classes: ['note'],
        style: {
          transform: 'translate3d(-100px, -100px, 0)'
        }
      }
    }

    static get defaultProps() {
      return Notes.Model
    }

    componentDidMount() {
      ClientRoutes.Store.listen(this.update.bind(this))
      NoteStore.listen(this.update.bind(this))
    }

    update(data) {
      switch (data.action) {

        case 'enter edit mode':
          this.enterEditMode()
          break

        case 'go to page':
          switch (data.page) {

            case 'add note':
              console.log('blow up note w id == new', this.props.id, data)
              this.setState({
                classes: ['note', 'edit'],
                style: { transform: 'translate3d(0, 0, 0)' }
              })
              break

            case 'edit note':
              console.log('find note & blow it up', this.props.id, data)
              this.setState({ classes: ['note', 'edit'] })
              break

            case 'home':
              console.log('close note', this.props.id)
              this.setState({ classes: ['note'] })
              break
          }
          break
      }
    }

    render() {
      console.log('render note', this.props)
      return (
        <div className={this.state.classes.join(' ')} style={this.state.style}>
          <Front {...this.props} actions={NoteActions} store={NoteStore} />
          <Back {...this.props} actions={NoteActions} store={NoteStore} />
        </div>
      )
    }
  }
}

export default Note
