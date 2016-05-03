'use strict'

Meteor.publish('sessions', function(searchString) {
  var where = {$or:[{'name': {
            '$regex': '.*' + (searchString || '') + '.*',
            '$options': 'i'
          }
        },
      {'sessionCode': {
          '$regex': '.*' + (searchString || '') + '.*',
          '$options': 'i'
        }
      }
  ]
  };
  Counts.publish(this, 'numberOfSessions', Sessions.find(where), {noReady: true});
  return Sessions.find(where);
});
