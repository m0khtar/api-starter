var jwt = require('jsonwebtoken'),
	config = require('../../config/config');

module.exports = {
	isAuthenticated: function(req, res, next) {
		if (!req.headers || !req.headers.authorization) {
			return res.status(401).send({
				message: 'Authorization header is missing.'
			});
		}
		
		var token = req.headers.authorization.split(' ')[1];

		if (token) {
			jwt.verify(token, config.secret, function(err, decoded) {
				if (err) {
					return res.json({
						success: false,
						message: 'Failed to authenticate token.'
					});
				} else {
					req.decoded = decoded;
					next();
				}
			});
		} else {
			return res.status(403).send({
				success: false,
				message: 'No token provided.'
			});
		}
	},
	isAdmin: function(req, res, next) {

	}
};