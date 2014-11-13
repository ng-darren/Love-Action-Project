/*jshint unused: vars */
define(['angular', 'angular-mocks', 'app'], function(angular, mocks, app) {
  'use strict';

  describe('Directive: fileUploadUser', function () {

    // load the directive's module
    beforeEach(module('lapApp.directives.Fileuploaduser'));

    var element,
      scope;

    beforeEach(inject(function ($rootScope) {
      scope = $rootScope.$new();
    }));

    it('should make hidden element visible', inject(function ($compile) {
      element = angular.element('<file-upload-user></file-upload-user>');
      element = $compile(element)(scope);
      expect(element.text()).toBe('this is the fileUploadUser directive');
    }));
  });
});
