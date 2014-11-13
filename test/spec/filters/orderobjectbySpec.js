/*jshint unused: vars */
define(['angular', 'angular-mocks', 'app'], function(angular, mocks, app) {
  'use strict';

  describe('Filter: orderObjectBy', function () {

    // load the filter's module
    beforeEach(module('lapApp.filters.Orderobjectby'));

    // initialize a new instance of the filter before each test
    var orderObjectBy;
    beforeEach(inject(function ($filter) {
      orderObjectBy = $filter('orderObjectBy');
    }));

    it('should return the input prefixed with "orderObjectBy filter:"', function () {
      var text = 'angularjs';
      expect(orderObjectBy(text)).toBe('orderObjectBy filter: ' + text);
    });

  });
});
