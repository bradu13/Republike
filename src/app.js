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
const battleRouter = require('./routes/battle.routes');
const battlePostRouter = require('./routes/battlepost.routes');
const notificationRouter = require('./routes/notification.routes');
const userSettingRouter = require('./routes/usersetting.routes');
const mediaRouter = require('./routes/media.routes');
const reportRouter = require('./routes/report.routes');
const commentRouter = require('./routes/comment.routes');
const searchRouter = require('./routes/search.routes');
const rewardRouter = require('./routes/reward.routes');

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
app.use('/usersetting', userSettingRouter);
app.use('/battles', battleRouter);
app.use('/battleposts', battlePostRouter);
app.use('/media', mediaRouter);
app.use('/reports', reportRouter);
app.use('/comments', commentRouter);
app.use('/search', searchRouter);
app.use('/rewards', rewardRouter);

// Catch 404 and forward to error handler
app.use(function (req, res) {
  res.sendStatus(404);
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
