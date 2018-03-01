const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const test = require('./controllers/authentication/check-password');
const authentication = require('./routers/authentication');


const app = express();

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.get('/test', test);
app.use('/authentication', authentication);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.end('404');
});

// error handler
app.use((err, req, res, next) => {
  res.end('500');
});

module.exports = app;
