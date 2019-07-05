// const results = require('./my_modules/results');

const express = require('express')
const routes = require('./routes')

// Create Express App
const app = express()

// Node.js body parsing middleware
const bodyParser = require('body-parser')
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies

// Routes
app.use('/', routes)

module.exports = app