/* ItemMirror's main.js is actually our Mytodo's>about.js */
'use strict';

/**
 * @ngdoc function
 * @name itemMirrorAngularDemoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the itemMirrorAngularDemoApp
 */
angular.module('mytodoApp')
  .controller('ContactCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });