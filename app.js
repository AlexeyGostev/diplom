const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.end('404');
});

// error handler
app.use((err, req, res, next) => {
  res.end('500');
});

module.exports = app;
