var router = require("express").Router();

var homeController = require('../controllers/home'),
	usersController = require('../controllers/users');

var md = require('../middlewares/index');

/********************************/

router.route('/')
	.get(homeController.index);

//users
router.route('/authenticate')
	.post(usersController.authenticate);
router.route('/signup')
	.post(usersController.signup);
//logout
router.route('/logout')
	.get(usersController.logout);


//users
router.route('/users')
	.get(md.isAuthenticated, usersController.list);
router.route('/users/:id')
	.get(md.isAuthenticated, usersController.read);

/********************************/

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