define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc filter
   * @name lapApp.filter:makeArray
   * @function
   * @description
   * # makeArray
   * Filter in the lapApp.
   */
  angular.module('lapApp.filters.Makearray', []).filter('makeArray', function () {
    return function(items) {
      var filtered = [];
      angular.forEach(items, function(item) {
        if(item !== 'projects' && item !== 'users') {
          filtered.push(item);
        }
      });
      return filtered;
    };
	});
});
