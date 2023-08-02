require('./config/database')
const express = require('express');
const routes = require('./routes/index')
var bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json())

// file path
app.use('/storage', express.static('storage'))

app.use('/', routes);

module.exports = app