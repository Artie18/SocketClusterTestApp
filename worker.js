var fs = require('fs');
var express = require('express');
var serveStatic = require('serve-static');
var path = require('path');

module.exports.run = function (worker) {
  console.log('   >> Worker PID:', process.pid);

  var app = require('express')();

  var httpServer = worker.httpServer;
  var scServer = worker.scServer;

  app.use(serveStatic(path.resolve(__dirname, 'public')));

  httpServer.on('request', app);

  var count = 0;

  scServer.on('connection', function (socket) {
    socket.on('ping', function (data) {
      scServer.global.publish('pong', count);
    });

    socket.on('disconnect', function () {

    });
  });
};
