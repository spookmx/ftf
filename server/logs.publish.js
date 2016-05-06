'use strict'

Meteor.publish('logs', function(options, searchString) {
  var where = {
    'name': {
      '$regex': '.*' + (searchString || '') + '.*',
      '$options': 'i'
    }
  };
  Counts.publish(this, 'numberOfLogs', Logs.find(where), {noReady: true});
  return Logs.find(where, options);
});
