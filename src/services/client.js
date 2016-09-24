'use strict'

/*
  This class sets up client-side-only logic.
*/

class Client {
  constructor() {
    // Create global namespace to mirror server globals
    window.GLOBAL = window
  }
}

export default new Client
