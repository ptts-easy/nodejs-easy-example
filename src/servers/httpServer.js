const http = require('http');
const createError = require('http-errors');
const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const debug = require('debug')('express-web-socket-example:server');
const path = require('path');

const routes = require('../routes/index.js');
const globals = require("../globals/globals.js");
const session = require('express-session');

var server;
var app = express();

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

function RunHttpServer(server_ip, server_port) {
  // view engine setup
  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'hbs');

//  app.use(logger('dev'));
//  app.use(express.json());
//  app.use(express.urlencoded({ extended: false }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  
  app.use(session({secret: globals.Secret}));

//  app.use(express.static(path.join(__dirname, '../../public')));

  app.use('/assets', express.static(path.join(__dirname, '../../public/assets')));
  app.use('/libs', express.static(path.join(__dirname, '../../public/libs')));
  app.get('/hello', function(req, res) {res.sendFile(path.join(__dirname, '../../public/hello.html'));});

  routes.PublicRoutes();
  routes.PrivateRoutes();

  app.use(routes.router);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  let port = normalizePort(server_port || '3000');
  app.set('port', port);
  server = http.createServer(app);

  console.log("RunHttpServer::", app.get('port'))

  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
}

module.exports = { RunHttpServer };