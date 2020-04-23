const express = require('express');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Enable PassportJs
require('./config/passport')(passport);

// Load Routers
const usersRouter = require('./routes/user.routes');
const authRouter = require('./routes/auth.routes');
const notificationRouter = require('./routes/notification.routes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Config Routes
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/notifications', notificationRouter);

// Catch 404 and forward to error handler
app.use(function (req, res) {
  res.status(404).send(404);
});

// Error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Send 500
  res.status(err.status || 500).send('Internal server error');
});

module.exports = app;
