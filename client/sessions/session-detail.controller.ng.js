'use strict'

angular.module('ftfApp')
.controller('SessionDetailCtrl', function($scope, $stateParams, $state, $rootScope, $filter) {

  $scope.helpers({
    session: function() {
      return Sessions.findOne({ _id: $stateParams.sessionId });
    }
  });

  $scope.subscribe('sessions');

  $rootScope.helpers({
    sessionId: function() {
      return $stateParams.sessionId;
    },
    session: function() {
      return Sessions.findOne({ _id: $stateParams.sessionId });
    }
  });

  $rootScope.sessionCheckIn = function(attendee) {
    !$scope.session.attendees ? $scope.session.attendees = [] : null;
    var found = $filter('filter')($scope.session.attendees, {uid: attendee.uid}, true);
    if(found.length){
      $scope.message = "Attendee already checked in!";
      $scope.$apply();
      console.log("Attendee already checked in!");
    }else{
      $scope.message = "";
      $scope.$apply();
      var name = attendee.n.split(";");
      name = name[1]+" "+name[0];
      Sessions.update({
          _id: $scope.sessionId
        }, {
          $push: { attendees: { registrant: Meteor.userId(), attendee: name, company: attendee.org, uid: attendee.uid, created_date: new Date(), synch:false } }
        }, function(error) {
          if(error) {
            Logs.insert({type: "error", message: "Unable to register attendee to session: "+$stateParams.sessionId, timestamp: new Date()});
          } else {
            console.log('Done!');
          }
      });
    }
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
