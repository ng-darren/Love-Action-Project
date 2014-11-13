/*jshint unused: vars */
define(['angular', 'angular-mocks', 'app'], function(angular, mocks, app) {
  'use strict';

  describe('Filter: makeArray', function () {

    // load the filter's module
    beforeEach(module('lapApp.filters.Makearray'));

    // initialize a new instance of the filter before each test
    var makeArray;
    beforeEach(inject(function ($filter) {
      makeArray = $filter('makeArray');
    }));

    it('should return the input prefixed with "makeArray filter:"', function () {
      var text = 'angularjs';
      expect(makeArray(text)).toBe('makeArray filter: ' + text);
    });

  });
});
