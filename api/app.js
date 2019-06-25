var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');;
var middleware = require('./middleware/jwt_token_checker');

var indexRouter = require('./routes/index');
var authenticationRouter = require('./routes/authentication');
var usersRouter = require('./routes/users');
var teamsRouter = require('./routes/teams');
var notificationsRouter = require('./routes/notifications');

var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// middleware.checkToken
app.use('/', indexRouter);
app.use('/authentication', authenticationRouter);
app.use('/users',middleware.checkToken, usersRouter);
app.use('/teams', teamsRouter);
app.use('./notifications', notificationsRouter);

module.exports = app;
