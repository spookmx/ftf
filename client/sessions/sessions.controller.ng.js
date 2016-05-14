'use strict'

angular.module('ftfApp')
.controller('SessionsCtrl', function($scope, $ionicScrollDelegate, $rootScope, $ionicLoading) {

  $scope.filterDay = "all";
  $scope.startDate = new Date("May 15, 2016 00:00:00");
  $scope.endDate = new Date("May 20, 2016 00:00:00");
  $scope.loadingStatus = true;

  // $scope.$watch('filterSearch', function() {
  //   if($scope.filterSearch != ""){
  //     $scope.filterActive = true;
  //   }else{
  //     $scope.filterActive = false;
  //   }
  // });
  //
  // $scope.$watch('loadingStatus', function() {
  //   if($scope.loadingStatus) {
  //     $ionicLoading.show({template: '<ion-spinner icon="lines" class="spinner-light"></ion-spinner><p>Loading Sessions...</p>'});
  //   }else{
  //     $ionicLoading.hide();
  //   }
  // });
  //
  //
  // $scope.$watchCollection('sessions', function() {
  //   if($scope.sessionsCount == $scope.sessions.length || $scope.filterActive) {
  //     $scope.loadingStatus = false;
  //   }else{
  //     $scope.loadingStatus = true;
  //   }
  // });
  //
  // $scope.filterActive = false;

  //To Do Watch filterDay and adjust startDate and endDate accordingly
  $scope.$watch('filterDay', function() {
    switch ($scope.filterDay) {
      case "all":
        $scope.startDate = new Date("May 15, 2016 00:00:00");
        $scope.endDate = new Date("May 20, 2016 00:00:00");
        $scope.filterActive = false;
        break;
      case "monday":
        $scope.startDate = new Date("May 16, 2016 00:00:00");
        $scope.endDate = new Date("May 16, 2016 23:59:59");
        $scope.filterActive = true;
        break;
      case "tuesday":
        $scope.startDate = new Date("May 17, 2016 00:00:00");
        $scope.endDate = new Date("May 17, 2016 23:59:59");
        $scope.filterActive = true;
        break;
      case "wednesday":
        $scope.startDate = new Date("May 18, 2016 00:00:00");
        $scope.endDate = new Date("May 18, 2016 23:59:59");
        $scope.filterActive = true;
        break;
      case "thursday":
        $scope.startDate = new Date("May 19, 2016 00:00:00");
        $scope.endDate = new Date("May 19, 2016 23:59:59");
        $scope.filterActive = true;
        break;
      default:
        $scope.startDate = new Date("May 15, 2016 00:00:00");
        $scope.endDate = new Date("May 20, 2016 00:00:00");
        $scope.filterActive = false;
    }
  });
  $scope.helpers({
    sessions: function() {
      return Sessions.find({start: {$gte:$scope.getReactively('startDate'), $lt:$scope.getReactively('endDate')}}, {
        sort: {name : 1, start: 1}
      });
    },
    sessionsCount: function() {
      return Counts.get('numberOfSessions');
    },
    isCordova: function() {
      return Meteor.isCordova;
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

  $scope.exportReport = function(){
    var csv = JSON2CSV($scope.sessions);
    window.open("data:text/csv;charset=utf-8," + escape(csv));
  }

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
