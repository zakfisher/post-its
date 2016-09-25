'use strict'

const { Link } = GLOBAL.ReactRouter

import Reflux from 'reflux'

import PlusIcon from './icons/plus.jsx'

import Notes from '../services/notes'
import ClientRoutes from '../services/client-routes'

class AddNoteButton extends GLOBAL.React.Component {
  constructor(props) {
    super(props)

    this.mixins = Reflux.connect([ClientRoutes.Store], 'router')

    this.state = {
      style: {
        display: 'none'
      }
    }
  }

  static get defaultProps() {
    return {}
  }

  componentDidMount() {
    ClientRoutes.Store.listen(this.update.bind(this))
  }

  update(data) {
    switch(data.action) {
      case 'go to page':
        console.log('go to page', data.page)
        switch (data.page) {

          case 'add note':
            Notes.Actions.addNote()

          case 'edit note':
            this.setState.bind(this)({ style: { display: 'none' } })
            break

          case 'home':
            this.setState.bind(this)({ style: { display: 'block' } })
            break

        }
        break
    }
  }

  render() {
    return (
      <Link to='/note/add' className='add-note-button' style={this.state.style}>
        <PlusIcon />
      </Link>
    )
  }
}

export default AddNoteButton
