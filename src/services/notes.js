'use strict'

/*
  This is the client-side App router.
  It hooks into React Router url changes.
*/

import Reflux from 'reflux'

let Notes = {}

Notes.routes = {
  '/': 'home',
  '/note/:id': 'note',
  '*': 'home'
}

Notes.Actions = Reflux.createActions([
  'getNotes',
])

Notes.Store = Reflux.createStore({
  listenables: [Notes.Actions],
  init: function() {
    // set notes from localStorage
    this.data.notes = [
      {
        title: 'My First Note',
        note: 'This is a note. You can add, edit, drag, and remove notes. The notes are cached in localStorage, so if you refresh they\'ll still be there!'
      }
    ]
  },
  data: {
    notes: []
  },
  onGetNotes: function(nextState) {
    this.trigger({
      action: 'get notes',
      notes: this.data.notes
    })
  },
})

export default Notes
