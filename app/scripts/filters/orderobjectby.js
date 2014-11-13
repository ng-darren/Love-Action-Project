define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc filter
   * @name lapApp.filter:orderObjectBy
   * @function
   * @description
   * # orderObjectBy
   * Filter in the lapApp.
   */
  angular.module('lapApp.filters.Orderobjectby', []).filter('orderObjectBy', function () {
    return function(items, field, reverse) {
      var filtered = [];
      angular.forEach(items, function(item) {
        filtered.push(item);
      });
      filtered.sort(function (a, b) {
        return (a[field] > b[field] ? 1 : -1);
      });
      if(reverse) { filtered.reverse(); }
      
      return filtered;
    };
	});
});
