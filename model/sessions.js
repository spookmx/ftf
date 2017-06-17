Sessions = new Mongo.Collection('sessions');

Sessions.allow({
  insert: function(userId, session) {
    session.createdAt = new Date();
    session.name_sort = session.name.toLowerCase();
    return true;
  },
  update: function(userId, session, fields, modifier) {
    //session.createdAt = new Date();
    session.name_sort = session.name.toLowerCase();
    return true;
  },
  remove: function(userId, session) {
    return true;
  }
});
