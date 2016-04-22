Meteor.startup(function() {
  if(Sessions.find().count() === 0) {
    var sessions = [
      'Data on the Wire',
      'One Language',
      'Database Everywhere',
      'Latency Compensation',
      'Full Stack Reactivity',
      'Embrace the Ecosystem',
      'Simplicity Equals Productivity'
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
