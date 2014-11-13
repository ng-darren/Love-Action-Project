define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name lapApp.controller:AdminCtrl
   * @description
   * # AdminCtrl
   * Controller of the lapApp
   */
  angular.module('lapApp.controllers.AdminCtrl', []).controller('AdminCtrl', function ($rootScope, $scope, $state, User, Project) {
    $scope.admin = true;

    $rootScope.projects = Project.all();
    $scope.users = User.all();

    $scope.queryUsers = '';
    
    $scope.size = {};
    $scope.role = {};

    $scope.emails = [];

    $scope.$watch('users.eff1af56fceec44c74463dc65d3b3769', function() {
      $scope.countUser = -13;
      angular.forEach($scope.users, function(item, id) {
        if(item !== 'users') {
          item.id = id;
          $scope.countUser++;
        }
      });
    });

    $rootScope.$watch('upcoming', function() {
      $scope.countProject = -13;
      angular.forEach($scope.projects, function(item) {
        if(item !== 'projects') {
          $scope.countProject++;
        }
      });

      $scope.size.xs = $scope.size.s = $scope.size.m = $scope.size.l = $scope.size.xl = $scope.size.xxxl = 0;
      $scope.role.friend = $scope.role.run = $scope.role.logistic = $scope.role.photo = 0;

      angular.forEach($scope.upcoming, function(up) {
        angular.forEach(up.volunteers, function(vol) {
          if (vol.uid !== 0) {
            var v = User.findByUid(vol.uid);
            $scope.emails.push(v.data.email);
          } else {
            $scope.emails.push(vol.email);
          }

          switch (vol.size) {
            case 'xs':
              $scope.size.xs++;
              break;
            case 's':
              $scope.size.s++;
              break;
            case 'm':
              $scope.size.m++;
              break;
            case 'l':
              $scope.size.l++;
              break;
            case 'xl':
              $scope.size.xl++;
              break;
            case '3xl':
              $scope.size.xxxl++;
              break;
          }

          switch (vol.role) {
            case 'friend':
              $scope.role.friend++;
              break;
            case 'run':
              $scope.role.run++;
              break;
            case 'log':
              $scope.role.logistic++;
              break;
            case 'photo':
              $scope.role.photo++;
              break;
          }
        });
      });
    });

    $rootScope.$watch('uid', function() {
      // Darren - Joe - Oh - Clariss
      if($rootScope.uid === '470f9ea75f7eba737087882c578d0ec0' || $rootScope.uid === 'eff1af56fceec44c74463dc65d3b3769' || $rootScope.uid === '533cdb2facb8b4ac30a863de666c37e2' || $scope.uid === '64e5c9332bc0901f1b5a79f5c2313895') {
        $scope.admin = true;
      } else {
        $scope.admin = false;
      }
    });
  });
});