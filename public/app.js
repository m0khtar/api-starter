var demoApp = angular.module('demoApp', ['ngRoute']);


/*
Config
 */
demoApp.config(function($routeProvider) {
	$routeProvider
		.when('/users', {
			controller: 'UsersController',
			templateUrl: '/static/users.html'
		})
		.when('/p2', {
			controller: 'SimpleController',
			templateUrl: '/static/view2.html'
		})
		.otherwise({
			redirectTo: '/'
		});
});

/*
Factory
 */
demoApp.factory('userFactory', function($http) {
	var factory = {};
	var baseURl = "http://192.168.101.134:3000/api/users";
	factory.getUsers = function() {
		return $http.get(baseURl, {
			headers: {
				'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7Il9pZCI6IjU1OWU1MWY0NDUwMGE1M2M5OTg0NzYyZSIsInNhbHQiOiIkMmEkMTAkekVJV0ZVQ2RyaFVKQTgxQlcvbVNxLiIsInVzZXJuYW1lIjoibW8iLCJlbWFpbCI6Im1vQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJHpFSVdGVUNkcmhVSkE4MUJXL21TcS5sVkQzdzdvL0N6R0pYMUpneW4zbzEwajYvbk9lMVNpIiwiX192IjowLCJjcmVhdGVkT24iOiIyMDE1LTA3LTA5VDEwOjUwOjI4LjU5N1oifSwiaWF0IjoxNDM2NTM1MzM2LCJleHAiOjE0MzY2MjE3MzYsImF1ZCI6Im1vIn0.TFIFsaZY426owjHO3cB-GLt_UzBrJewm7JegFxZbZms'
			}
		});
	};

	return factory;
});

/*
Controllers
 */
var controllers = {};
controllers.UsersController = function($scope, userFactory) {
	$scope.users = [];
	init();

	function init() {
		getCustomer();
	}

	function getCustomer() {
		userFactory.getUsers()
			.success(function(data, status) {
				$scope.users = data;
			});
	}
};

demoApp.controller(controllers);