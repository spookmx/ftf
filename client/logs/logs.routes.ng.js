'use strict'

angular.module('ftfApp')
.config(function($stateProvider) {
  $stateProvider
  .state('logs', {
    url: '/logs',
    templateUrl: 'client/logs/logs.view.ng.html',
    controller: 'LogsCtrl',
    resolve: {
      currentUser: ['$meteor', function($meteor) {
        return $meteor.requireUser();
      }]
    }
  });
});