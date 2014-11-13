define(['angular'], function (angular) {
	'use strict';

	angular.module('lapApp.controllers.ProfileCtrl', []).controller('ProfileCtrl', function ($scope, $state, Auth, User, Project) {
		if (!Auth.signedIn()) { $state.go('home'); }
		function populateProjects () {
			$scope.userProjects = {};
			$scope.commentedProjects = {};

			angular.forEach($scope.user.projects, function(projectId) {
				$scope.userProjects[projectId] = Project.find(projectId);
			});
		}

		function populateComments () {
			$scope.comments = {};

			angular.forEach($scope.user.comments, function(comment) {
				var project = Project.find(comment.projId);

				project.$on('loaded', function() {
					$scope.comments[comment.id] = project.$child('comments').$child(comment.id);
					$scope.commentedProjects[comment.projId] = project;
				});
			});
		}

		$scope.user = User.getCurrent();
		$scope.user.$on('loaded', function() {
			populateProjects();
			populateComments();
		});

		$scope.alert = {};
		$scope.submitUser = function() {
			User.update().then(function() {
				$scope.alert.type = 'alert-success';
				$scope.alert.msg = 'User profile has been updated successfully';
			});
		};
	});
});