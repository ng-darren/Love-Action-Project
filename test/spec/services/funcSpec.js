/*jshint unused: vars */
define(['angular', 'angular-mocks', 'app'], function(angular, mocks, app) {
  'use strict';

  describe('Service: Func', function () {

    // load the service's module
    beforeEach(module('lapApp.services.Func'));

    // instantiate service
    var Func;
    beforeEach(inject(function (_Func_) {
      Func = _Func_;
    }));

    it('should do something', function () {
      expect(!!Func).toBe(true);
    });

  });
});
