'use strict'

Meteor.publish('sessions', function(searchString) {
  var where = {
    'name': {
      '$regex': '.*' + (searchString || '') + '.*',
      '$options': 'i'
    }
  };
  Counts.publish(this, 'numberOfSessions', Sessions.find(where), {noReady: true});
  return Sessions.find(where);
});
