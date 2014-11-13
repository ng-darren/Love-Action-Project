define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc filter
   * @name lapApp.filter:datetime
   * @function
   * @description
   * # datetime
   * Filter in the lapApp.
   */
  angular.module('lapApp.filters.Datetime', []).filter('datetime', function ($filter) {
    return function(input) {
      if(input === null || input === undefined){ return ''; }

      var _date = $filter('date')(new Date(input), 'dd MMM yy h:mma');

      return _date;
    };
  });
});