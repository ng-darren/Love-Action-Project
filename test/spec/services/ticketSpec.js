/*jshint unused: vars */
define(['angular', 'angular-mocks', 'app'], function(angular, mocks, app) {
  'use strict';

  describe('Service: Ticket', function () {

    // load the service's module
    beforeEach(module('lapApp.services.Ticket'));

    // instantiate service
    var Ticket;
    beforeEach(inject(function (_Ticket_) {
      Ticket = _Ticket_;
    }));

    it('should do something', function () {
      expect(!!Ticket).toBe(true);
    });

  });
});
