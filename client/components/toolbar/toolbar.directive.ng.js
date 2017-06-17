'use strict'

angular.module('ftfApp')
.controller('toolbarController', ['$scope', function($scope) {
  $scope.name = 'NXP FTF Connects';
  $scope.helpers({
		status: () => {
		  return Meteor.status();
		}
	});
}])
.directive('toolbar', function() {
  return {
	  controller: 'toolbarController',
	  scope: true,
	  restrict: 'AE',
	  templateUrl: 'client/components/toolbar/toolbar.view.ng.html',
	  replace: true
  };
});
