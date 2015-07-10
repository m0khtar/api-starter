var config = require('../../config/config'),
	jwt = require('jsonwebtoken'),
	_ = require("lodash"),
	User = require('mongoose').model('User');

module.exports = {
	list: function(req, res) {
		User.find({}, function(err, users) {
			if (err) res.json(err);
			res.json(users);
		});
	},
	read: function(req, res) {
		User.findOne({
			//_id: req.params.id
		}, function(err, user) {
			if (err) res.json(err);
			res.json(user);
		});
	},
	authenticate: function(req, res) {
		var email = req.body.email,
			password = req.body.password;

		if (_.isEmpty(email) || _.isEmpty(password)) {
			res.status(401).send({
				success: false,
				message: 'Authentication failed. Wrong username / password.'
			});
		}

		User.findOne({
			email: req.body.email
		}, function(err, user) {
			if (err) res.json(err);
			if (!user) {
				res.status(401).send({
					success: false,
					message: 'Authentication failed. Wrong username / password.'
				});
			} else {
				//check password
				user.validPassword(req.body.password, function(err, isMatch) {
					if (err) res.status(500).send({
						success: false,
						message: 'Authentication failed.',
						error: err
					});
					if (isMatch) {
						var token = jwt.sign({
							user: user
						}, config.secret, {
							audience: 'mo',
							expiresInMinutes: 1440 // expires in 24 hours
						});
						res.json({
							success: true,
							token: token
						});
					} else {
						res.status(401).send({
							success: false,
							message: 'Authentication failed. Wrong username / password.'
						});
					}
				});
			}
		});
	},
	signup: function(req, res, next) {

	},
	logout: function(req, res) {}
};