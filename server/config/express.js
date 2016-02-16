'use strict';

var express = require('express');

module.exports = function(app) {
  app.set('port', 8080);

  var node_env = process.env.NODE_ENV;
  console.log('Environment: ' + node_env);
};