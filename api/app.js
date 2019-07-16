var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');;
var middleware = require('./middleware/jwt_token_checker');

var indexRouter = require('./routes/index');
var authenticationRouter = require('./routes/authentication');
var registrationRouter = require('./routes/registration');
var usersRouter = require('./routes/users');
var teamsRouter = require('./routes/teams');
var notificationsRouter = require('./routes/notifications');
var statesRouter = require('./routes/states');
var rolesRouter = require('./routes/roles');

var app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.get('origin'));
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
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
app.use('/api/authentication', authenticationRouter);
app.use('/api/registration', registrationRouter);
app.use('/api/users', middleware.checkToken, usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/notifications', notificationsRouter);
app.use('/api/states', statesRouter);
app.use('/api/roles', rolesRouter);

module.exports = app;
