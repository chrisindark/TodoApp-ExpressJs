var express = require('express');
var path = require('path');
var mongoose = require('mongoose'); // mongoose for mongodb
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information with HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');
var passport = require('passport');

var todoModel = require('./models/todo');
var userModel = require('./models/users');

require('./config/passport-config');

var index = require('./routes/index');
var auth = require('./routes/auth');
var todo = require('./routes/todo');


mongoose.connect('mongodb://localhost/todo'); // connect to mongoDB database

// configuration ===================
var app = express(); // create our app with express
app.use(express.static(path.join(__dirname, 'public'))); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
// app.use(methodOverride());

app.use(passport.initialize()); // initialize passport


app.use('/api', todo);
app.use('/api', auth);
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

app.use(function(err, req, res, next) {
  if (err.name === 'StatusError') {
    res.send(err.status, err.message);
  } else {
    next(err);
  }
});

module.exports = app;
