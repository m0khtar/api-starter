var router = require("express").Router();
var usersController = require('../controllers/users');
var md = require('../middlewares/index');

/********************************/
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

module.exports = router;