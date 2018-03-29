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

/*  Route setter */
app.use('/', root);

// 404 Page
app.use((req, res, next) => {
    res.status(404).send("The page you seek doesn't exist, please use / or /[your subject here]")
 });

app.listen(3000)

module.exports = app