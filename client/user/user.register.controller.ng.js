'use strict'

angular.module('ftfApp')
.controller('UserRegisterCtrl', function($scope, $ionicLoading, $state) {
	$scope.helpers({
		isLoggedIn: () => {
		  return Meteor.userId() !== null;
		},
		currentUser: () => {
		  return Meteor.user();
		}
	});
  	$scope.viewName = 'User';
  	$scope.register = function() {
		$ionicLoading.show({template: '<ion-spinner icon="lines" class="spinner-light"></ion-spinner>'});
      	Accounts.createUser({
			email:$scope.registerForm.email,
			password:$scope.registerForm.password}, $scope.registerCompleted);
	};
	$scope.registerCompleted = function() {
		$ionicLoading.hide();
		$state.go('user');
	};
});
