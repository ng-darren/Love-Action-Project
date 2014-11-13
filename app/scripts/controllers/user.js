define(['angular'], function (angular) {
	'use strict';

	angular.module('lapApp.controllers.UserCtrl', []).controller('UserCtrl', function ($scope, $stateParams, User, Project) {
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

		$scope.user = User.findByUid($stateParams.userId);
		$scope.stateParamsUserId = $stateParams.userId;
		$scope.user.$on('loaded', function() {
			populateProjects();
			populateComments();
		});
	});
});