'use strict'

const bodyParser = require('body-parser')
const express = require('express')
const favicon = require('serve-favicon')
const path = require('path')
const lodash = require('lodash')

// Set global vars on the server that mirror client globals
GLOBAL.React = require('react')
GLOBAL.ReactDOM = require('react-dom')

// Include server-side routes
const ServerRoutes = require('./src/services/server-routes')

// Create Express App
let app = express()
const router = express.Router()
app.set('port', (process.env.PORT || 4200))
app.use(favicon(__dirname + '/public/images/favicon.ico'))
app.use(express.static(__dirname + '/public'))

// Use JSX Views
app.set('views', path.join(__dirname, '/src'))
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine({
  doctype: '<!DOCTYPE html>',
  beautify: (process.env.NODE_ENV !== 'production'),
  transformViews: true,
  babel: {
    presets: ['es2015', 'react']
  }
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(router)

// Add Routes
new ServerRoutes(router)

// Start Server
app.listen(app.get('port'), () => {
  console.log("App server is running at localhost:" + app.get('port'))
})
