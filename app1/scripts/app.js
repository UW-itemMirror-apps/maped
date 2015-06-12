'use strict';

/**
 * @ngdoc overview
 * @name itemMirrorAngularDemoApp
 * @description
 * # itemMirrorAngularDemoApp
 *
 * Main module of the application.
 */
angular
  .module('itemMirrorAngularDemoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'mgcrea.ngStrap',
    'ui.sortable'
  ])

  /*idhar jadbad hai -->
  --> apna wala code: Mytodo>scripts>app.js

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs:'mc'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

*/

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/explorer', {
        templateUrl: 'views/explorer.html',
        controller: 'ExplorerCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
