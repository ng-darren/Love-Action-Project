define(['angular'], function (angular) {
  'use strict';

  angular.module('lapApp.controllers.MusicforthemindCtrl', []).controller('MusicforthemindCtrl', function ($window, $rootScope, $scope, $modal, $location, Func, User, Auth, Project, Ticket) {
    $scope.project = Project.find('musicforthemind');
    $scope.transactions = Ticket.all();

    var param = $location.search();
    $scope.alert = {};
    $scope.donationalert = {};
    $scope.disable = true;
    $scope.volunteerList = [];

    $scope.totalSession = 0;
    $scope.selectedSession = [];
    $scope.itemName = 'The item name.';
    $scope.itemNumber = '1';
    
    $scope.stepOne = {'background-color':'orange'};
    $scope.stepTwo = {'background-color':'#EEE'};
    $scope.stepThree = {'background-color':'#EEE'};
    $scope.showOne = true;
    $scope.showTwo = false;
    $scope.showThree = false;
    $scope.back = false;
    $scope.next = true;
    $scope.support = false;

    $scope.clickOne = function() {
      $scope.stepOne = {'background-color':'green'};
      $scope.stepTwo = {'background-color':'orange'};
      $scope.showOne = false;
      $scope.showTwo = true;
      $scope.back = true;
    };

    $scope.clickTwo = function() {
      $scope.stepTwo = {'background-color':'green'};
      $scope.stepThree = {'background-color':'orange'};
      $scope.showTwo = false;
      $scope.showThree = true;
      $scope.back = true;

      $scope.selectedSession = [];

      angular.forEach($scope.tickets, function(value) {
        if(value.selected) {
          this.push({name: value.name, time: value.time});
        }
      }, $scope.selectedSession);

      $scope.item_name = '';
      for(var i=0; i<$scope.selectedSession.length; i++){
        if(i < $scope.selectedSession.length-2) {console.log($scope.selectedSession[i].name );
          $scope.item_name += $scope.selectedSession[i].name + ', ';
        } else if(i === $scope.selectedSession.length-2) {console.log($scope.selectedSession[i].name );
          $scope.item_name += $scope.selectedSession[i].name + ' and ';
        } else {console.log($scope.selectedSession[i].name );
          $scope.item_name += $scope.selectedSession[i].name;
        }
      }
      
      var seat;
      switch($scope.type) {
        case 'stand':
          seat = 10;
          break;
        case 'seat':
          seat = 15;
          break;
        case 'bean':
          seat = 50;
          break;
        case 'table':
          seat = 150;
          break;
      }

      $scope.total = parseInt($scope.quantity) * $scope.totalSession * seat;
    };

    $scope.clickBack = function() {
      if($scope.showTwo===true) {
        $scope.showOne = true;
        $scope.showTwo = false;
        $scope.back = false;
      } else {
        $scope.showTwo = true;
        $scope.showThree = false;
      }
    };

    $scope.selectSessions = function(name, selected) {
      if(selected!==undefined) {
        if (selected) {
          $scope.totalSession++;
        } else {
          $scope.totalSession--;
        }
        // selected? $scope.totalSession++ : $scope.totalSession--;
      }
      // console.log(name + ': ' + selected);
      // console.log('total: ' + $scope.totalSession);
    };

    $scope.$watch('project.deadline', function() {
      $scope.disable = $scope.project.deadline < Date.now();

      angular.forEach($scope.project.volunteers, function(item) {
        $scope.volunteerList.push({
          item: item,
          rank: 0.5 - $window.Math.random()
        });
      });

      if (param.s && param.c) {
        $scope.donationalert.type = 'alert-success';
        $scope.donationalert.msg = 'Thank you for your payment. Your transaction has been completed and a receipt for your purchase has been emailed to you. You may log in to your account at www.sandbox.paypal.com/sg to view details of this transaction.';
      }
    });

    var ModalInstanceCtrl = function ($scope, $modalInstance) {
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };

      $scope.fbLogin = function () {
        Auth.fbLogin().then(function (authUser) {
          User.createFB(authUser, authUser.displayName);
          $modalInstance.dismiss('cancel');
        }, function (error) {
          $scope.error = error.toString().substring(48);
        });
      };
    };

    $scope.addVolunteer = function () {
      if(!Auth.signedIn()) {
        $modal.open({
          templateUrl: 'login.html',
          controller: ModalInstanceCtrl,
          size: 'md',
          backdrop: 'static'
        });
      } else {
        if($rootScope.currentUser.hasOwnProperty('projects')) {
          if($rootScope.currentUser.projects.hasOwnProperty('musicforthemind')) {
            $scope.alert.type = 'alert-info';
            $scope.alert.msg = 'You have already signed up to volunteer for Project ' + $scope.project.name + '. Please take note of the date and time of the event and we will contact you with further details of the event through your email soon.';
          } else {
            Project.addVolunteer('musicforthemind', $scope.role, $scope.size, $scope.contact);
            $scope.alert.type = 'alert-success';
            $scope.alert.msg = 'Thank you for signing up to volunteer for Project ' + $scope.project.name + '. Please take note of the date and time of the event and we will contact you with further details of the event through your email soon.';
          }
        } else {
          Project.addVolunteer('musicforthemind', $scope.role, $scope.size, $scope.contact);
          $scope.alert.type = 'alert-success';
          $scope.alert.msg = 'Thank you for signing up to volunteer for Project ' + $scope.project.name + '. Please take note of the date and time of the event and we will contact you with further details of the event through your email soon.';
        }
      }
    };

    $scope.fbLogin = function () {
      Auth.fbLogin().then(function (authUser) {
        var guid = Func.createHash(authUser.uid);
        var u = User.findByUid(guid);

        if(!u.hasOwnProperty('username')) {
          User.createFB(authUser, authUser.displayName);
        } else {
          User.updateFB(authUser);
        }
      }, function (error) {
        $scope.error = error.toString().substring(48);
      });
    };

    $scope.addComment = function () {
      Project.addComment('musicforthemind', $scope.comment);
      $scope.comment = '';
    };

    $scope.removeComment = function (comment) {
      Project.deleteComment($scope.project, comment);
    };
  });
});
