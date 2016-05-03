'use strict'

Meteor.methods({
  upsertSessions: function () {
    HTTP.get("https://maria.spotme.com/api/v1/eid/9a2b57983d9149b1ff9cedc66d5dde29/nodehandlers/nxpnfc/schedule",
    {params: {key: "Xj6Za32pCb", view:"all"}},
    function(error, result) {
      if(error){
        console.log(error);
      }else{
        if(result.data.agenda){
          result.data.agenda.forEach(function(session){
            Sessions.update(
               { sessionID: session.SessionID },
               {
                  sessionID: session.SessionID,
                  sessionCode: session.fp_ext_id,
                  start: new Date(session.start*1000),
                  end: new Date(session.end*1000),
                  name: session.name,
                  location: session.location,
                  vip: session.IsVIP,
               },
               { upsert: true }
            );
          });
        }else{
          console.log("Agenda not found on response from SpotMe");
        }
      }
    });
    return "upsertSessions executed";
  }
});
