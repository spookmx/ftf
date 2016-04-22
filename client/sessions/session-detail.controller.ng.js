'use strict'

angular.module('ftfApp')
.controller('SessionDetailCtrl', function($scope, $stateParams, $state, $rootScope) {

  $scope.helpers({
    session: function() {
      return Sessions.findOne({ _id: $stateParams.sessionId });
    }
  });

  $scope.subscribe('sessions');

  $rootScope.helpers({
    sessionId: function() {
      return $stateParams.sessionId ;
    }
  });

  $rootScope.sessionCheckIn = function(attendee) {
    Sessions.update({
        _id: $scope.sessionId
      }, {
        $push: { attendees: { registrant: Meteor.userId(), attendee: attendee.fn, company: attendee.org, created_date: new Date() } }
      }, function(error) {
        if(error) {
          alert(error);
        } else {
          console.log('Done!');
        }
    });
  };

  $scope.remove = function() {
    Sessions.remove({_id: $stateParams.sessionId});
    $state.go("sessions");
  };

  $scope.save = function() {
    if($scope.form.$valid) {
      delete $scope.session._id;
      Sessions.update({
        _id: $stateParams.sessionId
      }, {
        $set: $scope.session
      }, function(error) {
        if(error) {
          console.log('Unable to update the session');
        } else {
          console.log('Done!');
        }
      });
    }
  };

  $scope.reset = function() {
    $scope.session.reset();
  };
});
