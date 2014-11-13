/*jshint unused: vars */
define(['angular', 'angular-mocks', 'app'], function(angular, mocks, app) {
  'use strict';

  describe('Directive: fileUploadProject', function () {

    // load the directive's module
    beforeEach(module('lapApp.directives.Fileuploadproject'));

    var element,
      scope;

    beforeEach(inject(function ($rootScope) {
      scope = $rootScope.$new();
    }));

    it('should make hidden element visible', inject(function ($compile) {
      element = angular.element('<file-upload-project></file-upload-project>');
      element = $compile(element)(scope);
      expect(element.text()).toBe('this is the fileUploadProject directive');
    }));
  });
});
