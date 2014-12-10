/*jshint unused: vars */
define(['angular', 'controllers/main', 'controllers/nav', 'controllers/discover', 'controllers/start', 'controllers/project', 'controllers/user', 'services/project', 'services/auth', 'services/user', 'controllers/profile', 'services/func', 'directives/fileuploadproject', 'filters/orderobjectby', 'filters/makearray', 'filters/datetime', 'directives/fileuploaduser', 'controllers/contact', 'services/email', 'controllers/cas', 'controllers/admin', 'controllers/musicforthemind', 'services/ticket']/*deps*/,
  function (angular, MainCtrl, NavCtrl, DiscoverCtrl, StartCtrl, ProjectCtrl, UserCtrl, ProjectFactory, AuthFactory, UserFactory, ProfileCtrl, FuncFactory, FileuploadprojectDirective, OrderobjectbyFilter, MakearrayFilter, DatetimeFilter, FileuploaduserDirective, ContactCtrl, EmailService, CasCtrl, AdminCtrl, MusicforthemindCtrl, TicketService)/*invoke*/ {
  'use strict';

  return angular.module('lapApp', ['lapApp.controllers.MainCtrl',
    'lapApp.controllers.NavCtrl',
    'lapApp.controllers.DiscoverCtrl',
    'lapApp.controllers.StartCtrl',
    'lapApp.controllers.ProjectCtrl',
    'lapApp.controllers.ProfileCtrl',
    'lapApp.controllers.UserCtrl',
    'lapApp.controllers.ContactCtrl',
    'lapApp.controllers.CasCtrl',
    'lapApp.controllers.AdminCtrl',
    'lapApp.services.Project',
    'lapApp.services.Auth',
    'lapApp.services.User',
    'lapApp.services.Func',
    'lapApp.services.Email',
    'lapApp.directives.Fileuploadproject',
    'lapApp.directives.Fileuploaduser',
    'lapApp.filters.Orderobjectby',
    'lapApp.filters.Makearray',
    'lapApp.filters.Datetime',
    'lapApp.controllers.MusicforthemindCtrl',
    'lapApp.services.Ticket',
/*angJSDeps*/
    'rulerHTTP',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngTouch',
    'ngAnimate',
    'angularMoment',
    'ezfb',
    'ui.router',
    'ui.bootstrap',
    'firebase',
    'textAngular',
    ])
  .constant('FIREBASE_URL', 'https://loveactionproject.firebaseIO.com/')
  .config(function ($stateProvider, $locationProvider, $uiViewScrollProvider) {
    $uiViewScrollProvider.useAnchorScroll();
    $stateProvider.state('main',{
      url: '',
      templateUrl: 'views/main.html',
      controller:'MainCtrl'
    })
    .state('home', {
      url: '/home',
      templateUrl: 'views/main.html',
      controller:'MainCtrl'
    })
    .state('discover', {
      url: '/discover',
      templateUrl: 'views/discover.html',
      controller: 'DiscoverCtrl'
    })
    .state('start', {
      url: '/start',
      templateUrl: 'views/start.html',
      controller: 'StartCtrl'
    })
    .state('user', {
      url: '/user/:userId',
      templateUrl: 'views/user.html',
      controller: 'UserCtrl'
    })
    .state('cas', {
      url: '/cas',
      templateUrl: 'views/cas.html',
      controller: 'CasCtrl'
    })
    .state('cas2', {
      url: '/project/cb277678c00a15eb205113522b319206',
      templateUrl: 'views/cas.html',
      controller: 'CasCtrl'
    })
    .state('/musicforthemind', {
      url: '/project/musicforthemind',
      templateUrl: 'views/musicforthemind.html',
      controller: 'MusicforthemindCtrl'
    })
    .state('/musicforthemind2', {
      url: '/musicforthemind',
      templateUrl: 'views/musicforthemind.html',
      controller: 'MusicforthemindCtrl'
    })
    .state('project', {
      url: '/project/:projectId',
      templateUrl: 'views/project.html',
      controller: 'ProjectCtrl'
    })
    .state('edit', {
      url: '/edit',
      templateUrl: 'views/edit.html',
      controller: 'EditCtrl'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: 'views/profile.html',
      controller: 'ProfileCtrl'
    })
    .state('guide', {
      url: '/guide',
      templateUrl: 'views/guide.html'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'views/about.html',
    })
    .state('rules', {
      url: '/rules',
      templateUrl: 'views/rules.html'
    })
    .state('whoweare', {
      url: '/whoweare',
      templateUrl: 'views/whoweare.html'
    })
    .state('whyfb', {
      url: '/whyfb',
      templateUrl: 'views/whyfb.html'
    })
    .state('contact', {
      url: '/contact',
      templateUrl: 'views/contact.html',
      controller: 'ContactCtrl'
    })
    .state('faq', {
      url: '/faq',
      templateUrl: 'views/faq.html'
    })
    .state('safety', {
      url: '/safety',
      templateUrl: 'views/safety.html'
    })
    .state('privacy', {
      url: '/privacy',
      templateUrl: 'views/privacy.html'
    })
    .state('admin', {
      url: '/admin',
      templateUrl: 'views/admin.html',
      controller: 'AdminCtrl'
    });

    // enable HTML5 Mode for SEO
    // $locationProvider.html5Mode(true);
    // $locationProvider.html5Mode(true).hashPrefix('!');
  })
  .config(function (ezfbProvider) {
    ezfbProvider.setInitParams({
      // This is my FB app id for plunker demo app
      appId: '394570703968663',
      version: 'v2.0'
    });
  });
});