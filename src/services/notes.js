'use strict'

import Reflux from 'reflux'
import _ from 'lodash'

let Notes = {}
const hasLocalStorage = GLOBAL.hasOwnProperty('localStorage')

const DemoNote = {
  id: 'demo',
  title: 'My First Note',
  text: 'This is a note. You can add, edit, drag, and remove notes. The notes are cached in localStorage, so if you refresh they\'ll still be there!',
  translateX: -100,
  translateY: -100,
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
    // this.clearLocalStorage()
    this.getLocalStorage()
  },
  clearLocalStorage: function() {
    if (!hasLocalStorage) return
    console.log('clear localStorage')
    localStorage.removeItem('notes')
  },
  getLocalStorage: function() {
    if (!hasLocalStorage) return
    let notesCache = localStorage.getItem('notes')
    const notesCacheJSON = JSON.parse(notesCache)

    // If localStorage exists, use it and escape
    if (notesCache && notesCache.length) {
      console.log('set notes from localStorage ::', notesCacheJSON)
      this.data.notes = notesCacheJSON
      return
    }

    // If no localStorage yet, use demo note
    else {
      this.data.notes = [DemoNote]
      this.setLocalStorage()
    }
  },
  setLocalStorage: function() {
    if (!hasLocalStorage) return
    localStorage.setItem('notes', JSON.stringify(this.data.notes))
    console.log('set localStorage#notes\n', localStorage.getItem('notes'))
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
  onEditNote: function() {
    this.trigger({
      action: 'edit note'
    })
  },
  onSaveNote: function(newNote) {
    delete newNote.classes
    delete newNote.style
    this.data.notes = this.data.notes.map((note) => {
      if (note.id === newNote.id) return newNote
      else return note
    })
    this.setLocalStorage()
  },
  onDeleteNote: function(noteId) {
    this.data.notes = this.data.notes.filter((note) => {
      return note.id !== noteId
    })
    Notes.Actions.getAll()
    this.setLocalStorage()
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
