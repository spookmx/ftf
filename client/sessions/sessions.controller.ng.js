'use strict'

angular.module('ftfApp')
.controller('SessionsCtrl', function($scope, $ionicScrollDelegate, $rootScope) {
  $scope.filterDay = "all";
  $scope.startDate = new Date("May 15, 2016 00:00:00");
  $scope.endDate = new Date("May 20, 2016 00:00:00");

  //To Do Watch filterDay and adjust startDate and endDate accordingly

  $scope.helpers({
    sessions: function() {
      return Sessions.find({start: {$gte:$scope.getReactively('startDate'), $lt:$scope.getReactively('endDate')}}, {
        sort: {name : 1, start: 1}
      });
    },
    sessionsCount: function() {
      return Counts.get('numberOfSessions');
    }
  });

  $scope.subscribe('sessions', function() {
    return [$scope.getReactively('filterSearch')];
  });

  $scope.save = function() {
    if ($scope.form.$valid) {
      Sessions.insert($scope.newSession);
      $scope.newSession = undefined;
      $ionicScrollDelegate.resize();
    }
  };

  $scope.remove = function(session) {
    console.log("Session removed")
    Sessions.remove({_id: session._id});
    $ionicScrollDelegate.resize();
  };

  $scope.pageChanged = function(newPage) {
    $scope.page = newPage;
  };

  return $scope.$watch('orderProperty', function() {
    if ($scope.orderProperty) {
      $scope.sort = {
        name_sort: parseInt($scope.orderProperty)
      };
    }
  });
});
