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

Sessions.after.update(function (userId, doc, fieldNames, modifier, options) {
  if(modifier.$push){
    var registration = doc.attendees[doc.attendees.length-1];
    var sessionID = doc.sessionID;
    var timeUNIX = (registration.created_date.getTime()/1000).toFixed(0);
    console.log("UID: "+registration.uid+" @ "+sessionID+" @ "+timeUNIX);
    // HTTP.post("https://maria.spotme.com/api/v1/eid/9a2b57983d9149b1ff9cedc66d5dde29/nodehandlers/nxpnfc/attendance",
    // {
    //   body:{
    //     participant_id:registration.uid,
    //     session_id:sessionID,
    //     timestamp:timeUNIX
    //    },
    //   headers:{
    //     'Content-Type':'application/json',
    //     'x-api-key':'Xj6Za32pCb'
    //   }
    // },function(error, response){
    //   if(error){
    //     console.log(error);
    //   }else{
    //     console.log(response);
    //   }
    // });
  }
}, {fetchPrevious: false});
