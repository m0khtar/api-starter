var homeController = require('../controllers/home'),
	usersController = require('../controllers/users');

function isAuthenticated(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/login');
}

module.exports = function(app) {
	app.route('/')
		.get(homeController.index);

	//users
	app.route('/login')
		.post(usersController.login);
	app.route('/signup')
		.post(usersController.signup);
	//logout
	app.route('/logout')
		.get(usersController.logout);
};