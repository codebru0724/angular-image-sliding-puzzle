	'use strict';

	var mainApp = angular.module("mainApp", ['ngRoute']);
	
	mainApp.config(['$routeProvider','$locationProvider',
    function ($routeProvider, $locationProvider){

		$routeProvider
			.when('/', {
				templateUrl:"./home.html"
			})
			.when('/game', {
				templateUrl:"./views/gameView.html"
			})
			.otherwise({redirectTo: '/home.html'});

			$locationProvider.html5Mode({
				enabled: true,
				requireBase: false
			});

		}]);
	