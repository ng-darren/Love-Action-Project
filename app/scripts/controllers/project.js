define(['angular'], function (angular) {
	'use strict';

	angular.module('lapApp.controllers.ProjectCtrl', []).controller('ProjectCtrl', function ($window, $rootScope, $scope, $stateParams, $modal, Func, User, Auth, Project) {
		$scope.project = Project.find($stateParams.projectId);
		$scope.alert = {};
		$scope.disable = true;
		$scope.volunteerList = [];

		$scope.$watch('project.deadline', function() {
			$scope.disable = $scope.project.deadline < Date.now();

			angular.forEach($scope.project.volunteers, function(item) {
		    $scope.volunteerList.push({
		        item: item,
		        rank: 0.5 - $window.Math.random()
			    });
			});
		});

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

		$scope.addVolunteer = function () {
			if(!Auth.signedIn()) {
				$modal.open({
					templateUrl: 'login.html',
					controller: ModalInstanceCtrl,
					size: 'md',
					backdrop: 'static'
				});
			} else {
				if($rootScope.currentUser.hasOwnProperty('projects')) {
					if($rootScope.currentUser.projects.hasOwnProperty($stateParams.projectId)) {
						$scope.alert.type = 'alert-info';
						$scope.alert.msg = 'You have already signed up to volunteer for Project ' + $scope.project.name + '. Please take note of the date and time of the event. The organisor will contact you with further details of the event through your email soon.';
					} else {
						Project.addVolunteer($stateParams.projectId);
						$scope.alert.type = 'alert-success';
						$scope.alert.msg = 'Thank you for signing up to volunteer for Project ' + $scope.project.name + '. Please take note of the date and time of the event. The organisor will contact you with further details of the event through your email soon.';
					}
				} else {
					Project.addVolunteer($stateParams.projectId);
					$scope.alert.type = 'alert-success';
					$scope.alert.msg = 'Thank you for signing up to volunteer for Project ' + $scope.project.name + '. Please take note of the date and time of the event. The organisor will contact you with further details of the event through your email soon.';
				}
			}
		};

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

		$scope.addComment = function () {
			Project.addComment($stateParams.projectId, $scope.comment);
			$scope.comment = '';
		};

		$scope.removeComment = function (comment) {
			Project.deleteComment($scope.project, comment);
		};
	});
});