define(['angular'], function (angular) {
	'use strict';

	angular.module('lapApp.controllers.StartCtrl', []).controller('StartCtrl', function ($rootScope, $scope, $modal, Auth, User, Func, Project) {
		$scope.project = {};
		$scope.alert = {};
		$scope.contactAlert = {};
		$scope.btnFile = $scope.btnContact = true;
		$scope.btnProject = false;

		var ModalInstanceCtrl = function ($scope, $modalInstance) {
			$scope.cancel = function () {
				$modalInstance.dismiss('cancel');
			};

			$scope.fbLogin = function () {
				Auth.fbLogin().then(function (authUser) {
					User.createFB(authUser, authUser.displayName);
					$modalInstance.dismiss('cancel');
				}, function (error) {
					$scope.error = error.toString().substring(48);
				});
			};
		};

		$scope.submitProject = function () {
			if (!Auth.signedIn()) {
				$modal.open({
					templateUrl: 'login.html',
					controller: ModalInstanceCtrl,
					size: 'md',
					backdrop: 'static'
				});
			} else {
				$scope.project.createdBy = $rootScope.currentUser.username;
				$scope.project.uid = $rootScope.uid;
				$scope.project.created = Date.now();

				// Convert date to milliseconds since midnight Jan 1, 1970
				var d = new Date($scope.project.date);
				$scope.project.date = d.getTime();
				$scope.project.deadline = $scope.project.date - ($scope.project.deadline*86400000);

				var id = Func.createHash($scope.project.created + $scope.project.createdBy);
				$scope.project.id = id;

				Project.create($scope.project, id).then(function() {
					$scope.alert.type = 'alert-success';
					$scope.alert.msg = 'Project ' + $scope.project.name + ' has been created.';
					$scope.btnProject = true;
					$scope.btnFile = $scope.btnContact = false;
				});
			}
		};

		$scope.submitContact = function () {
			if($scope.project.email === undefined) {
				$scope.project.email = $rootScope.currentUser.data.email;
			}

			Project.update($scope.project).then(function() {
				$scope.contactAlert.type = 'alert-success';
				$scope.contactAlert.msg = 'Your contact details has been submitted';
				$scope.btnFile = $scope.btnContact = false;
			});
		};

		$scope.today = function() {
			$scope.minDate = $scope.minDate ? null : new Date();
		};
		$scope.today();

		$scope.clear = function () {
			$scope.project.deadline = null;
		};

		$scope.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.opened = true;
		};
	});
});