/*  Modules */
const express = require('express')
const bodyParser = require('body-parser')
const rp = require('request-promise')

/* Routes Require*/
const root = require('./routes/root')

var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

/*  Route setters */
app.use('/', root);
 
app.listen(3000)