// var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var livereload = require("livereload");
// var connectLivereload = require("connect-livereload");
const hbs = require('express-handlebars')
const fs = require('fs')

var indexRouter = require('./routes/index');

const publicDirectory = path.join(__dirname, 'public');

// var liveReloadServer = livereload.createServer();
// liveReloadServer.watch(publicDirectory);
// liveReloadServer.server.once("connection", () => {
//   setTimeout(() => {
//     liveReloadServer.refresh("/");
//   }, 100);
// });

var app = express();

// app.use(connectLivereload());

// Handlebars configuration
app.engine('hbs', hbs({ extname: 'hbs' }))
app.set('view engine', 'hbs')

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(publicDirectory));

app.use('/', indexRouter);

console.log("Starting server");

module.exports = app;
