'use strict'

angular.module('ftfApp')
.controller('LogsCtrl', function($scope) {
  $scope.viewName = 'Logs';
  $scope.helpers({
    logs: function() {
      return Logs.find({}, {
        sort: {timestamp : 1}
      });
    },
    logsCount: function() {
      return Counts.get('numberOfLogs');
    }
  });

  $scope.subscribe('logs');
});
