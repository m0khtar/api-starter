var app = angular.module('myApp', ['ui.router']);

app.controller('MainCtrl', [
	'$scope',
	function($scope) {
		$scope.test = 'Hello world!';
	}
]);
app.controller('NavCtrl', [
	'$scope',
	function($scope) {
		$scope.currentUser = 'Hello world!';
	}
]);