/*jshint unused: vars */
define(['angular', 'angular-mocks', 'app'], function(angular, mocks, app) {
  'use strict';

  describe('Service: email', function () {

    // load the service's module
    beforeEach(module('lapApp.services.Email'));

    // instantiate service
    var email;
    beforeEach(inject(function (_email_) {
      email = _email_;
    }));

    it('should do something', function () {
      expect(!!email).toBe(true);
    });

  });
});
