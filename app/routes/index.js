var router = require("express").Router();

var homeController = require('../controllers/home');

/********************************/

router.route('/')
	.get(homeController.index);

//setup
router.get('/setup', function(req, res) {
	var faker = require('faker');
	// create a sample user
	var mo = new require('mongoose').model('User')({
		username: 'mo',
		email: 'mo@gmail.com',
		password: 'secret'
	});

	// save the sample user
	mo.save(function(err) {
		if (err) throw err;
		console.log('User saved successfully');
		res.json({
			success: true
		});
	});


	//faker
	for (var i = 0; i < 10; i++) {
		var user = new require('mongoose').model('User')({
			username: faker.internet.userName(),
			email: faker.internet.email(),
			password: faker.internet.password()
		});
		user.save(function(err) {
			if (err) throw err;
			console.log('User ' + user.username + ' saved successfully');
			res.json({
				success: true
			});
		});
	}
});

module.exports = router;