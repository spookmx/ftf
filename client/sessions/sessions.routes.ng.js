'use strict'

angular.module('ftfApp')
.config(function($stateProvider) {
  $stateProvider
  .state('sessions', {
    url: '/sessions',
    templateUrl: 'client/sessions/sessions-list.view.ng.html',
    controller: 'SessionsCtrl'
  })
  .state('session-detail', {
    url: '/sessions/:sessionId',
    templateUrl: 'client/sessions/session-detail.view.ng.html',
    controller: 'SessionDetailCtrl',
    resolve: {
      currentUser: ['$meteor', function($meteor) {
        return true;
        //return $meteor.requireUser();
      }]
    }
  });
});
