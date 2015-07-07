var config = require('./config'),
	express = require('express'),
	favicon = require('serve-favicon'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	methodOverride = require('method-override'),
	compress = require('compression'),
	session = require('express-session'),
	morgan = require('morgan'),
	flash = require('connect-flash'),
	errorHandler = require('errorhandler'),
	lusca = require('lusca'),
	path = require('path');

module.exports = function() {
	var app = express();
	app.set('env', 'development');

	//config
	app.set('port', process.env.PORT || 3000);
	app.locals.env = app.get('env');

	//middleware
	app.use(favicon('./public/favicon.ico'));
	if ('development' == app.get('env')) {
		app.use(morgan('dev'));
	} else {
		app.use(compress());
	}
	app.use(cookieParser());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(methodOverride());
	var sess = {
		secret: config.secret,
		resave: true,
		saveUninitialized: true,
		cookie: {
			maxAge: config.sessionMaxAge
		}
	};
	if ('production' == app.get('env')) {
		app.set('trust proxy', 1)
		sess.cookie.secure = true;
	}
	app.use(session(sess));
	app.use(flash());
	app.use(function(req, res, next) {
		res.locals.success = req.flash('success');
		res.locals.errors = req.flash('error');
		next();
	});
	app.use(lusca({
		csrf: true,
		xframe: 'SAMEORIGIN',
		hsts: {
			maxAge: 31536000,
			includeSubDomains: true,
			preload: true
		},
		xssProtection: true
	}));

	app.use('/static', express.static('public'));

	//routes
	app.use('/api', require('../app/routes/index'));
	
	//load all routes first
	if ('development' == app.get('env')) {
		app.use(errorHandler());
	}

	return app;
};