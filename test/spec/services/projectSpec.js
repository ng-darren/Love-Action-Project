/*jshint unused: vars */
define(['angular', 'angular-mocks', 'app'], function(angular, mocks, app) {
  'use strict';

  describe('Service: Project', function () {

    // load the service's module
    beforeEach(module('lapApp.services.Project'));

    // instantiate service
    var Project;
    beforeEach(inject(function (_Project_) {
      Project = _Project_;
    }));

    it('should do something', function () {
      expect(!!Project).toBe(true);
    });

  });
});
