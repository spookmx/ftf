'use strict'

angular.module('ftfApp')
.config(function($stateProvider) {
  $stateProvider
  .state('user', {
    url: '/user',
    templateUrl: 'client/user/user.view.ng.html',
    controller: 'UserCtrl'
  })
  .state('user-register', {
    url: '/user/register',
    templateUrl: 'client/user/user.register.ng.html',
    controller: 'UserRegisterCtrl'
  })
  .state('user-changepassword', {
    url: '/user/changepassword',
    templateUrl: 'client/user/user.changepassword.ng.html',
    controller: 'UserChangePasswordCtrl'
  });
});
