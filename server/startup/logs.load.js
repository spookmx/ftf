Meteor.startup(function() {
  if(Logs.find().count() === 0) {
    var logs = [
      {
        type: "info",
        message: "System started",
        timestamp: new Date()
      },
      {
        type: "info",
        message: "Logs initialized",
        timestamp: new Date()
      },
    ];
    logs.forEach(function(log) {
      Logs.insert(log);
    });
  }
});
