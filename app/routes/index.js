var router = require("express").Router();

var homeController = require('../controllers/home');

/********************************/

router.route('/')
	.get(homeController.index);

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