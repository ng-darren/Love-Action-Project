define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name lapApp.controller:ContactCtrl
   * @description
   * # ContactCtrl
   * Controller of the lapApp
   */
  angular.module('lapApp.controllers.ContactCtrl', []).controller('ContactCtrl', function ($rootScope, $scope, Email) {
    if($rootScope.signedIn()) {
      $scope.name = $rootScope.currentUser.username;
      $scope.email = $rootScope.currentUser.data.email;
    }

    $scope.sendEmail = function() {
      $scope.msg = 'Sending message';
      $scope.loading = 'images/dots32.gif';
      $scope.messageType = 'alert-warning';

      var e = new Email();
      e.name = $scope.name;
      e.email = $scope.email;
      e.message = $scope.message;
      e.$save(function(data) {
        $scope.loading = '';
        $scope.msg = 'Thank you, ' + data.name + '! We have gotten your message and we will get back to you through your email (' + data.email + ') real soon.';
        $scope.messageType = 'alert-success';
      }, function() {
        $scope.loading = '';
        $scope.msg = 'Error in sending message. Please send your message in an email to darren@loveactionproject.com';
        $scope.messageType = 'alert-danger';
      });
    };
  });

  angular.module('rulerHTTP', [], function($httpProvider) {
    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
   
    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function(data) {
      /**
       * The workhorse; converts an object to x-www-form-urlencoded serialization.
       * @param {Object} obj
       * @return {String}
       */
      var param = function(obj) {
        var query = '';
        var name, value, fullSubName, subName, subValue, innerObj, i;
        
        for(name in obj) {
          value = obj[name];
          
          if(value instanceof Array) {
            for(i=0; i<value.length; ++i) {
              subValue = value[i];
              fullSubName = name + '[' + i + ']';
              innerObj = {};
              innerObj[fullSubName] = subValue;
              query += param(innerObj) + '&';
            }
          }
          else if(value instanceof Object) {
            for(subName in value)  {
              subValue = value[subName];
              fullSubName = name + '[' + subName + ']';
              innerObj = {};
              innerObj[fullSubName] = subValue;
              query += param(innerObj) + '&';
            }
          }
          else if(value !== undefined && value !== null) {
            query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
          }
        }
        
        return query.length ? query.substr(0, query.length - 1) : query;
      };
      
      return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
  });
});