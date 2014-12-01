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

      $scope.selectedSession = [];

      angular.forEach($scope.tickets, function(value) {
        if(value.selected) {
          var stand, seat, bean, table;
          if(value.seat===0) {
            seat=0;
          } else {
            seat=1;
          }
          this.push({name: value.name, time: value.time, stand: value.stand, seat: value.seat, bean: value.bean, table: value.table, seatSoldOut: seat});
        }
      }, $scope.selectedSession);
    };

    $scope.clickTwo = function() {
      $scope.stepTwo = {'background-color':'green'};
      $scope.stepThree = {'background-color':'orange'};
      $scope.showTwo = false;
      $scope.showThree = true;
      $scope.back = true;

      // Prep for Paypal
      $scope.item_name = $scope.selectedSession[0].name;
      
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

      $scope.total = parseInt($scope.quantity) * seat;
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
    };

    $scope.selectType = function() {
      if($scope.selectedSession.length) {
        switch ($scope.type) {
          case 'stand':
            $scope.quantityMax = $scope.selectedSession[0].stand;
            break;
          case 'seat':
            $scope.quantityMax = $scope.selectedSession[0].seat;
            break;
          case 'bean':
            $scope.quantityMax = $scope.selectedSession[0].bean;
            break;
          case 'table':
            $scope.quantityMax = $scope.selectedSession[0].table;
            break;
        }
        
      }
    }

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
