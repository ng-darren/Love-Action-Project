/*jshint unused: vars */
require.config({
  paths: {
    angular: '../bower_components/angular/angular',
    'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router',
    'angular-bootstrap': '../bower_components/angular-bootstrap/ui-bootstrap-tpls',
    'angular-route': '../bower_components/angular-route/angular-route',
    'angular-touch': '../bower_components/angular-touch/angular-touch',
    'angular-resource': '../bower_components/angular-resource/angular-resource',
    'angular-mocks': '../bower_components/angular-mocks/angular-mocks',
    'angular-cookies': '../bower_components/angular-cookies/angular-cookies',
    'angular-animate': '../bower_components/angular-animate/angular-animate',
    'angular-moment': '../bower_components/angular-moment/angular-moment',
    'angular-easyfb': '../bower_components/angular-easyfb/angular-easyfb',
    moment: '../bower_components/moment/min/moment.min',
    firebase: '../bower_components/firebase/firebase',
    angularfire: '../bower_components/angularfire/angularfire',
    'firebase-simple-login': '../bower_components/firebase-simple-login/firebase-simple-login',
    'textAngular-sanitize': '../bower_components/textAngular/dist/textAngular-sanitize.min',
    textAngular: '../bower_components/textAngular/dist/textAngular.min',
    jquery: '../bower_components/jquery/dist/jquery',
    bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
    'angular-scenario': '../bower_components/angular-scenario/angular-scenario'
  },
  shim: {
    angular: {
      exports: 'angular'
    },
    'angular-bootstrap': [
      'angular'
    ],
    'angular-route': [
      'angular'
    ],
    'angular-touch': [
      'angular'
    ],
    'angular-cookies': [
      'angular'
    ],
    'angular-animate': [
      'angular'
    ],
    'angular-resource': [
      'angular'
    ],
    'angular-moment': [
      'angular'
    ],
    'angular-easyfb': [
      'angular'
    ],
    moment: [
      'angular'
    ],
    'angular-mocks': {
      deps: [
        'angular'
      ],
      exports: 'angular.mock'
    },
    'angular-ui-router': {
      deps: [
        'angular'
      ]
    },
    firebase: [
      'angular'
    ],
    angularfire: [
      'angular',
      'firebase'
    ],
    'firebase-simple-login': [
      'angular'
    ],
    'textAngular-sanitize': [
      'angular'
    ],
    textAngular: [
      'angular'
    ]
  },
  priority: [
    'angular'
  ]
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = 'NG_DEFER_BOOTSTRAP!';

require([
  'angular',
  'app',
  'angular-bootstrap',
  'angular-ui-router',
  'angular-route',
  'angular-touch',
  'angular-cookies',
  'angular-resource',
  'angular-animate',
  'angular-easyfb',
  'angular-moment',
  'moment',
  'firebase',
  'angularfire',
  'firebase-simple-login',
  'textAngular-sanitize',
  'textAngular'
], function(angular, app, ngRoutes, ngCookies, ngResource) {
  'use strict';
  /* jshint ignore:start */
  var $html = angular.element(document.getElementsByTagName('html')[0]);
  /* jshint ignore:end */
  angular.element().ready(function() {
    angular.resumeBootstrap([app.name]);
  });
});