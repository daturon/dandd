var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
var secrets = require('./config/secrets');

var app = express();

var connect = function() {
  mongoose.connect(secrets.db, function(err, res) {
    if(err) {
      console.log('Error connecting to: ' + secrets.db + '. ' + err);
    } else {
      console.log('Succeeded connected to: ' + secrets.db);
    }
  });
};
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

fs.readdirSync(__dirname + '/models').forEach(function(file) {
  if(file.indexOf('.js') !== -1) {
    require(__dirname + '/models/' + file);
  }
});

require('./config/express')(app);
require('./config/routes')(app);

app.listen(app.get('port'));