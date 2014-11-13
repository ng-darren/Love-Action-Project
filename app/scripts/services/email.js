define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc service
   * @name lapApp.email
   * @description
   * # email
   * Service in the lapApp.
   */
  angular.module('lapApp.services.Email', []).service('Email', function email($resource) {
    return $resource('http://loveactionproject.com/rulerMail/sendmail.php', {}, {
      save: {method:'POST', isArray: false}
    });
  });
});