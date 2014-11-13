define(['angular'], function (angular) {
  'use strict';

  angular.module('lapApp.services.Auth', []).factory('Auth', function ($firebaseSimpleLogin, FIREBASE_URL, Firebase, $rootScope) {
    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseSimpleLogin(ref);

    var Auth = {
      register: function (user) {
        return auth.$createUser(user.email, user.password);
      },
      signedIn: function () {
        return auth.user !== null;
      },
      login: function (user) {
        return auth.$login('password', user, true);
      },
      fbLogin: function () {
        return auth.$login('facebook', { rememberMe: true, scope: 'email,user_likes' });
      },
      logout: function () {
        auth.$logout();
      },
      reset: function () {
        auth.sendPasswordResetEmail('email', function(error) {
          return (error) ? false : true;
        });
      }
    };

    $rootScope.signedIn = function () {
      return Auth.signedIn();
    };

    return Auth;
  });
});