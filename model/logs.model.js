Logs = new Mongo.Collection('logs');

Logs.allow({
  insert: function(userId, log) {
    return true;
  },
  update: function(userId, log, fields, modifier) {
    return true;
  },
  remove: function(userId, log) {
    return true;
  }
});