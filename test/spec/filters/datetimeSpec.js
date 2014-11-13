/*jshint unused: vars */
define(['angular', 'angular-mocks', 'app'], function(angular, mocks, app) {
  'use strict';

  describe('Filter: datetime', function () {

    // load the filter's module
    beforeEach(module('lapApp.filters.Datetime'));

    // initialize a new instance of the filter before each test
    var datetime;
    beforeEach(inject(function ($filter) {
      datetime = $filter('datetime');
    }));

    it('should return the input prefixed with "datetime filter:"', function () {
      var text = 'angularjs';
      expect(datetime(text)).toBe('datetime filter: ' + text);
    });

  });
});
