'use strict'

import Reflux from 'reflux'
import _ from 'lodash'

let Notes = {}
const isClient = GLOBAL.hasOwnProperty('localStorage')

const DemoNote = {
  id: 'demo',
  title: 'My First Note',
  text: 'This is a note. You can add, edit, drag, and remove notes. The notes are cached in localStorage, so if you refresh they\'ll still be there!',
  translateX: 0,
  translateY: 0,
  translateZ: 0,
}

Notes.Actions = Reflux.createActions([
  'getAll',
  'addNote',
  'editNote',
  'saveNote',
  'deleteNote',
  'showDesktop',
  'cancelNewNote',
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
        const notes = this.data.notes = [DemoNote]
        localStorage.setItem('notes', JSON.stringify(notes))
        console.log('set default notes ::', localStorage.getItem('notes'))
      }
    }
  },
  onGetAll: function() {
    this.trigger({
      action: 'get notes',
      notes: this.data.notes
    })
  },
  onAddNote: function() {
    this.trigger({
      action: 'add note'
    })
  },
  onEditNote: function(noteId) {
    this.trigger({
      action: 'edit note',
      id: noteId
    })
  },
  onSaveNote: function(note) {
    console.log('on save note', note)
    // this.trigger({
    //   action: 'updated note'
    // })
    // update localStorage
  },
  onDeleteNote: function(noteId) {
    console.log('delete note', noteId)
    this.data.notes = this.data.notes.filter((note) => {
      return note.id !== noteId
    })
    console.log('notes', this.data.notes)
    Notes.Actions.getAll()
    // update localStorage
  },
  onShowDesktop: function() {
    this.trigger({
      action: 'show desktop'
    })
  },
  onCancelNewNote: function() {
    this.trigger({
      action: 'cancel new note'
    })
  }
})

export default Notes
