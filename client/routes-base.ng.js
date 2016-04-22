'use strict';

angular.module('ftfApp')

.config(function($urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/user');
}).run(['$rootScope', '$state', function($rootScope, $state) {
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    switch(error) {
      case 'AUTH_REQUIRED':
      case 'FORBIDDEN':
      case 'UNAUTHORIZED':
        $state.go('user');
        break;
    }
  });
}]);
