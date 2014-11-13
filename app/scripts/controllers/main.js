define(['angular'], function (angular) {
	'use strict';

	angular.module('lapApp.controllers.MainCtrl', []).controller('MainCtrl', function ($rootScope, $scope, $interval, $timeout, Auth, User, Project) {
		$scope.fbLogin = function () {
			Auth.fbLogin().then(function (authUser) {
				User.createFB(authUser, authUser.displayName);
			}, function (error) {
				$scope.error = error.toString().substring(48);
			});
		};

		$rootScope.projects = Project.all();
		
		$scope.myStyle = true;

		var move = function () {
			var slider = $timeout(function() {
				if ($scope.myStyle === true) {
					$scope.myStyle = false;
					$timeout.cancel(slider);
					move();
				} else {
					$scope.myStyle = true;
					$timeout.cancel(slider);
					move();
				}
			}, Math.floor((Math.random() * 10) + 4) * 1000);
		};
		move();
	});
});