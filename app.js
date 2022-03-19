require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const i18n = require('i18n');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const docs = require('./docs');
// const eventListener = require('./event');

const apiRouter = require('./routes/api');

const app = express();
const env = process.env.NODE_ENV || 'development';
global._config = require(__dirname + '/config/config.json')[env];
global._logger = require('./utils/logger');

// enabling cors
app.use(cors());

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// initialize language package
app.use(i18n.init);

// config language package
i18n.configure({
  locales: ['en', 'vi', 'jp'],
  directory: __dirname + '/locales',
  defaultLocale: 'en',
});

// connect to mongodb
mongoose.connect(_config.host, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use('/api', apiRouter);
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(docs, {
    explorer: true,
    customSiteTitle: 'KYC Platform APIs Document',
  })
);

// serve static files
app.use('/assets', express.static('public'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// eventListener();

module.exports = app;
