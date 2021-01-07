const createError = require('http-errors');
const cron = require('node-cron');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const { initializeServer, isUpdateAvailable } = require('./helpers/server');

const serverRouter = require('./routes/server');
const castRouter = require('./routes/cast');
const indexRouter = require('./routes/index');

const app = express();

const { my_ip } = require('./client_secret.json');

app.use(logger('dev'));
app.use(express.json());

const allowedOrigins = ['http://localhost:5000', my_ip];
app.use(
  cors({
    origin: (origin, cb) => {
      console.log('Request from: ', origin);
      if (!origin) return cb(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return cb(new Error(msg), false);
      }
      return cb(null, true);
    },
    optionsSuccessStatus: 200,
  }),
);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './views')));

global.assistants = {};

cron.schedule('0 1 * * *', function () {
  if (isUpdateAvailable)
    console.log(`An update is available. Please visit https://github.com/greghesp/assistant-relay/releases`);
});

(async function () {
  try {
    await initializeServer();
  } catch (e) {
    console.error('ERROR: ', e);
    process.exit();
  }
})();

app.use('/server', serverRouter);
app.use('/cast', castRouter);
app.use('/', indexRouter);
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  console.log(req.body, req.query);
  console.log(err);
});

module.exports = app;