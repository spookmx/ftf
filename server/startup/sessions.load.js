Meteor.startup(function() {
  if(Sessions.find().count() === 0) {
    var sessions = [
      'Session One',
      'Session 2',
    ];
    sessions.forEach(function(session) {
      Sessions.insert({
        name: session,
        name_sort: session.toLowerCase(),
        createdAt: new Date()
      });
    });
  }
});
