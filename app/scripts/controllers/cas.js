define(['angular'], function (angular) {
	'use strict';

	angular.module('lapApp.controllers.CasCtrl', []).controller('CasCtrl', function ($window, $rootScope, $scope, $modal, $location, Func, User, Auth, Project) {
		$scope.project = Project.find('cb277678c00a15eb205113522b319206');
		var param = $location.search();
		$scope.alert = {};
		$scope.donationalert = {};
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

			if (param.amount === '10') {
				$scope.donationalert.type = 'alert-success';
				$scope.donationalert.msg = 'Thank you for donating a meal and basic health checkup for one of our dogs. Join us and support Deborah as she run for the animals.';
				$scope.project.donations.ten = $scope.project.donations.ten + 1;
				Project.updateDonations($scope.project);
			} else if (param.amount === '20') {
				$scope.donationalert.type = 'alert-success';
				$scope.donationalert.msg = 'Thank you for giving a dog vaccination, deworm treatment and microchip. Join us and support Deborah as she run for the animals.';
				$scope.project.donations.twenty = $scope.project.donations.twenty + 1;
				Project.updateDonations($scope.project);
			} else if (param.amount === '30') {
				$scope.donationalert.type = 'alert-success';
				$scope.donationalert.msg = 'Thank you for giving a dog a meal, vaccination, deworm treatment and microchip. Join us and support Deborah as she run for the animals.';
				$scope.project.donations.thirty = $scope.project.donations.thirty + 1;
				Project.updateDonations($scope.project);
			} else if (param.amount === '50') {
				$scope.donationalert.type = 'alert-success';
				$scope.donationalert.msg = 'Thank you for giving a dog one meal a day for a week and vaccination. Join us and support Deborah as she run for the animals.';
				$scope.project.donations.fifty = $scope.project.donations.fifty + 1;
				Project.updateDonations($scope.project);
			} else if (param.amount === '100') {
				$scope.donationalert.type = 'alert-success';
				$scope.donationalert.msg = 'Thank you for giving a dog one meal a day for a week, vaccination, sterilisation and microchip. Join us and support Deborah as she run for the animals.';
				$scope.project.donations.hundred = $scope.project.donations.hundred + 1;
				Project.updateDonations($scope.project);
			} else if (param.amount === '200') {
				$scope.donationalert.type = 'alert-success';
				$scope.donationalert.msg = 'Thank you for giving a dog one meal a day for a week, vaccination, sterilisation, microchip and heartworm treatment. Join us and support Deborah as she run for the animals.';
				$scope.project.donations.twohundred = $scope.project.donations.twohundred + 1;
				Project.updateDonations($scope.project);
			}
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
					if($rootScope.currentUser.projects.hasOwnProperty('cb277678c00a15eb205113522b319206')) {
						$scope.alert.type = 'alert-info';
						$scope.alert.msg = 'You have already signed up to volunteer for Project ' + $scope.project.name + '. Please take note of the date and time of the event. The organisor will contact you with further details of the event through your email soon.';
					} else {
						Project.addVolunteer('cb277678c00a15eb205113522b319206', $scope.role, $scope.size);
						$scope.alert.type = 'alert-success';
						$scope.alert.msg = 'Thank you for signing up to volunteer for Project ' + $scope.project.name + '. Please take note of the date and time of the event. The organisor will contact you with further details of the event through your email soon.';
					}
				} else {
					Project.addVolunteer('cb277678c00a15eb205113522b319206', $scope.role, $scope.size);
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
			Project.addComment('cb277678c00a15eb205113522b319206', $scope.comment);
			$scope.comment = '';
		};

		$scope.removeComment = function (comment) {
			Project.deleteComment($scope.project, comment);
		};
	});
});