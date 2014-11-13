define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc directive
   * @name lapApp.directive:fileUploadUser
   * @description
   * # fileUploadUser
   */
  angular.module('lapApp.directives.Fileuploaduser', []).directive('fileUploadUser', function (User) {
    return {
      restrict: 'A',
      link: function (scope, elem) {
        var reader = new FileReader();
        reader.onload = function (e) {
          if(e.total > 1048576) {
            scope.uploadAlert = {
              type: 'alert-danger',
              msg: 'Image upload not successful. File size too big, the maximum file size is 1Mb.'
            };
            scope.$apply();
          } else if (e.target.result.substr(0, 10) !== 'data:image'){
            scope.uploadAlert = {
              type: 'alert-danger',
              msg: 'Image upload not successful. File is not a recognisable image.'
            };
            scope.$apply();
          } else {
            scope.image = e.target.result;
            User.updateImage(scope.image).then(function() {
              scope.uploadAlert = {
                type: 'alert-success',
                msg: 'Your profile image has been updated.'
              };
            });
            scope.$apply();
          }
        };

        elem.on('change', function() {
          reader.readAsDataURL(elem[0].files[0]);
        });
      }
    };
  });
});