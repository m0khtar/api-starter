var User = require('mongoose').model('User');

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
	login: function(req, res, next) {

	},
	signup: function(req, res, next) {

	},
	logout: function(req, res) {

	}
};