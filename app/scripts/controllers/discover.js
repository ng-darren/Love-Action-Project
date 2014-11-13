define(['angular'], function (angular) {
	'use strict';

	angular.module('lapApp.controllers.DiscoverCtrl', []).controller('DiscoverCtrl', function ($rootScope, $scope, Project) {
		$rootScope.projects = Project.all();
		$scope.query = '';
	});
});
