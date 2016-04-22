'use strict'

angular.module('ftfApp')
.controller('SessionsCtrl', function($scope, $ionicScrollDelegate, $rootScope) {
  $scope.page = 1;
  $scope.perPage = 10;
  $scope.sort = {name_sort : 1};
  $scope.orderProperty = '1';

  $scope.helpers({
    sessions: function() {
      return Sessions.find({}, {
        sort: $scope.getReactively('sort')
      });
    },
    sessionsCount: function() {
      return Counts.get('numberOfSessions');
    }
  });

  $scope.subscribe('sessions', function() {
    return [{
      sort: $scope.getReactively('sort'),
      limit: parseInt($scope.getReactively('perPage')),
      skip: ((parseInt($scope.getReactively('page'))) - 1) * (parseInt($scope.getReactively('perPage')))
    }, $scope.getReactively('search')];
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
