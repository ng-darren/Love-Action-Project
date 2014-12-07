define(['angular'], function (angular) {
	'use strict';

	angular.module('lapApp.controllers.NavCtrl', []).controller('NavCtrl', function ($rootScope, $scope, $state, $modal, Auth, User, Project, Func) {
		$rootScope.projects = Project.all();
		$scope.opened = false;
		var ModalInstanceCtrl = function ($scope, $modalInstance) {
			$scope.cancel = function () {
				$modalInstance.dismiss('cancel');
			};
		};

		$rootScope.$watch('currentUser', function() {
			if($rootScope.currentUser !== undefined) {
				if (!$rootScope.currentUser.hasOwnProperty('about') && $scope.opened === false) {
					$modal.open({
						templateUrl: 'about.html',
						controller: ModalInstanceCtrl,
						size: 'md',
						backdrop: 'static'
					});
					$scope.opened = true;
				}
			}
		});

		$scope.fbLogin = function () {
			Auth.fbLogin().then(function (authUser) {
				var guid = Func.createHash(authUser.uid);
				var u = User.findByUid(guid);

				if(!u.hasOwnProperty('username')) {
					User.createFB(authUser, authUser.displayName);
				} else {
					User.updateFB(authUser);
				}
			}, function (error) {
				$scope.error = error.toString().substring(48);
			});
		};

		$scope.logout = function () {
			Auth.logout();
			$state.go('home');
		};
	});
});