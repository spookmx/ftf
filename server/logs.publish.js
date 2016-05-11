'use strict'

Meteor.publish('logs', function(options, searchString) {
  var where = {};
  Counts.publish(this, 'numberOfLogs', Logs.find(where), {noReady: true});
  return Logs.find(where, options);
});
