// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone');

var express = require('express');
var mongoose = require('mongoose');
var secrets = require('./secrets');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({

	'name': 'DandD',
	'brand': 'DandD',

	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'jade',

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',

	'port': 8080,
	'mongo': secrets.db,
	'cookie secret': secrets.sessionSecret,
	'session store': 'mongo'

});

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('cloudinary config', {
	cloud_name: secrets.cloud_image_name,
	api_key: secrets.cloud_image_api_key,
	api_secret: secrets.cloud_image_api_secret
});

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

// Load your project's Routes

keystone.set('routes', require('./routes'));

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
	'posts': ['posts', 'post-categories'],
	'users': 'users'
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
