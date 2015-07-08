var config = require('../../config/config'),
	jwt = require('jsonwebtoken'),
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
		User.findOne({
			email: req.body.email
		}, function(err, user) {
			if (err) res.json(err);
			if (!user) {
				res.json({
					success: false,
					message: 'Authentication failed. Wrong username / password.'
				});
			} else if (user && req.body.password) {
				//check password
				user.validPassword(req.body.password, function(err, isMatch) {
					if (err) res.json({
						success: false,
						message: 'Authentication failed.',
						error: err
					});
					if (isMatch) {
						var token = jwt.sign(user, config.secret, {
							expiresInMinutes: 1440 // expires in 24 hours
						});
						res.json({
							success: true,
							token: token
						});
					} else {
						res.json({
							success: false,
							message: 'Authentication failed. Wrong username / password.'
						});
					}
				});
			} else {
				res.json({
					success: false,
					message: 'Authentication failed. Wrong username / password.'
				});
			}
		});
	},
	signup: function(req, res, next) {

	},
	logout: function(req, res) {

	}
};