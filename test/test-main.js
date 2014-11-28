var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    // Removed "Spec" naming from files
    if (/Spec\.js$/.test(file)) {
      tests.push(file);
    }
  }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/app/scripts',

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
    bootstrap: '../bower_components/bootstrap/dist/js/bootstrap'
  },

    shim: {
        'angular' : {'exports' : 'angular'},
        'angular-route': ['angular'],
        'angular-cookies': ['angular'],
        'angular-sanitize': ['angular'],
        'angular-resource': ['angular'],
        'angular-mocks': {
          deps:['angular'],
          'exports':'angular.mock'
        }
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});
