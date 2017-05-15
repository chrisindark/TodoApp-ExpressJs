var express = require('express');
var path = require('path');
var mongoose = require('mongoose'); // mongoose for mongodb
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information with HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

require('./models/todo');
var index = require('./routes/index');
var todo = require('./routes/todo');

// configuration ===================
var app = express(); // create our app with express

mongoose.connect('mongodb://localhost/todo') // connect to mongoDB database

app.use(express.static(path.join(__dirname, 'public'))); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
// app.use(methodOverride());

app.use('/api', todo);
app.use('', index);

var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
  // TODO
}

// production only
if (env === 'production') {
  // TODO
}

module.exports = app;
