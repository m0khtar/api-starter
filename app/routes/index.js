var router = require("express").Router();
var homeController = require('../controllers/home'),
	usersController = require('../controllers/users');

function isAuthenticated(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/login');
}

router.route('/')
	.get(homeController.index);

//users
router.route('/login')
	.post(usersController.login);
router.route('/signup')
	.post(usersController.signup);
//logout
router.route('/logout')
	.get(usersController.logout);


//users
router.route('/users')
	.get(usersController.list);
router.route('/users/:id')
	.get(usersController.read);


//setup
router.get('/setup', function(req, res) {
	// create a sample user
	var john = new require('mongoose').model('User')({
		username: 'john',
		email: 'john@doe.com',
		password: 'secret'
	});

	// save the sample user
	john.save(function(err) {
		if (err) throw err;
		console.log('User saved successfully');
		res.json({
			success: true
		});
	});
});

module.exports = router;