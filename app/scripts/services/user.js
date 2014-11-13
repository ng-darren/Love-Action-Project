define(['angular'], function (angular) {
  'use strict';

  angular.module('lapApp.services.User', []).factory('User', function ($rootScope, $state, $firebase, FIREBASE_URL, Firebase, Func) {
    var ref = new Firebase(FIREBASE_URL + 'users');
    var homeRef = new Firebase(FIREBASE_URL);
    var home = $firebase(homeRef);
    var users = $firebase(ref);

    var User = {
      all: function () {
        return home.$child('users');
      },
      create: function (authUser, username) {
        users[username] = {
          username: username,
          $priority: authUser.uid
        };

        users.$save(username).then(function () {
          setCurrentUser(username);
        });
      },
      createFB: function (authUser, username) {
        var guid = Func.createHash(authUser.uid);

        users[guid] = {
          username: username,
          data: authUser.thirdPartyUserData,
          $priority: guid
        };

        users.$save(guid).then(function () {
          setCurrentUser(guid);
        });
      },
      findByUsername: function (username) {
        if (username) {
          return users.$child(username);
        }
      },
      findByUid: function (uid) {
        if (uid) {
          return users.$child(uid);
        }
      },
      updateFB: function (authUser) {
        var guid = Func.createHash(authUser.uid);
        var u = User.findByUid(guid);
        u.data = authUser.thirdPartyUserData;

        return users.$child(guid).$update(u);
      },
      update: function () {
        var u = User.findByUid($rootScope.uid);
        u.username = $rootScope.currentUser.username;
        u.about = $rootScope.currentUser.about;
        u.why = $rootScope.currentUser.why;
        u.passionate = $rootScope.currentUser.passionate;

        return users.$child($rootScope.uid).$update(u);
      },
      updateImage: function (image) {
        var u = User.findByUid($rootScope.uid);
        u.image = image;

        return users.$child($rootScope.uid).$update(u);
      },
      getCurrent: function () {
        return $rootScope.currentUser;
      },
      signedIn: function () {
        return $rootScope.currentUser !== undefined;
      }
    };

    function setCurrentUser (uid) {
      $rootScope.currentUser = User.findByUid(uid);
      $rootScope.uid = uid;
    }

    // Propogate user info into rootScope for every login event
    $rootScope.$on('$firebaseSimpleLogin:login', function (e, authUser) {
      var guid = Func.createHash(authUser.uid);
      var query = $firebase(ref.startAt(guid).endAt(guid));

      query.$on('loaded', function () {
        setCurrentUser(query.$getIndex()[0]);
      });
    });

    // Delete user info from rootScope for logout event
    $rootScope.$on('$firebaseSimpleLogin:logout', function() {
      delete $rootScope.currentUser;
      delete $rootScope.uid;
      $rootScope.$apply();
    });

    return User;
  });
});
