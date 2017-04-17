// (function(angular) {
	'use strict';

	var mainApp = angular.module("mainApp", ['ngRoute']);
	
	mainApp.config(function($routeProvider) {

		$routeProvider
			.when('/', {
				templateUrl:"./home.html"
			})
			.when('/game', {
				templateUrl:"./views/gameView.html"
			});
		});
	
// })(window.angular);
