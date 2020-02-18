const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};
const indexRouter = require('./routes/index');
const DBConnect = require('./DBConnector/db');
const app = express();

DBConnect.client.connect();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));

app.use('/', indexRouter);

module.exports = app;
