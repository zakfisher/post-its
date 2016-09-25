'use strict'

/*
  This is a dictionary for our Notes in localStorage.
*/

import Reflux from 'reflux'
import _ from 'lodash'

let Notes = {}
const isClient = GLOBAL.hasOwnProperty('localStorage')

Notes.Model = {
  id: 'new',
  title: 'My First Note',
  text: 'This is a note. You can add, edit, drag, and remove notes. The notes are cached in localStorage, so if you refresh they\'ll still be there!',
  translateX: 0,
  translateY: 0,
  translateZ: 0,
}

Notes.Actions = Reflux.createActions([
  'getAll',
  'addNote',
  'updateNote',
  'deleteNote',
])

Notes.Store = Reflux.createStore({
  listenables: [Notes.Actions],
  data: {
    notes: []
  },
  init: function() {
    // Set notes from localStorage
    if (isClient) {
      let notesCache = localStorage.getItem('notes')
      const notesCacheJSON = JSON.parse(notesCache)

      // Clear localStorage
      console.log('clear localStorage')
      localStorage.removeItem('notes')

      // If localStorage exists, use it and escape
      if (notesCache && notesCache.length) {
        console.log('set notes from localStorage ::', notesCacheJSON)
        this.data.notes = notesCacheJSON
        return
      }

      // If no localStorage yet, use demo note
      else {
        const notes = this.data.notes = [Notes.Model]
        localStorage.setItem('notes', JSON.stringify(notes))
        console.log('set default notes ::', localStorage.getItem('notes'))
      }
    }
  },
  onGetAll: function() {
    this.trigger({
      action: 'get all notes',
      notes: this.data.notes
    })
  },
  onAddNote: function(note) {
    console.log('add note to data..')
    // this.data.notes.push[note]
    this.trigger({
      action: 'add note',
      note
    })
  },
  onUpdateNote: function() {
    this.trigger({
      action: 'updated note'
    })
  },
  onDeleteNote: function() {
    this.trigger({
      action: 'deleted note'
    })
  },
})

export default Notes
