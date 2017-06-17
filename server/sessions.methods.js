'use strict'

Meteor.methods({
  synchSessions: function () {
    //Send data again in case there was an error getting to the end point
    var currentSessions = Sessions.find().fetch();
    currentSessions.forEach(function (doc, index) {
      if(doc.attendees){
        doc.attendees.forEach(function(docInner, indexInner){
          if(!docInner.synch){
            //Begin synch
            //var timeUNIX = (docInner.created_date.getTime()/1000).toFixed(0);
            console.log(doc.sessionCode, docInner.uid);
            HTTP.get("https://getregisterednow.com/NXP/Event/onsite/CheckIn.asp",
            {params: {a:"s", t: "fwek7uyvmc6edjncvc3cjkd", l:"791", u:docInner.uid, s:doc.sessionCode}},
            function(error, response){
              if(error){
                Logs.insert({type: "error", message: "SpotMe HTTP endpoint GET error. Session: "+doc.sessionCode+", Attendee:"+docInner.uid, timestamp: new Date()});
              }else{
                if(!response.data.error){
                  Sessions.update({
                      sessionCode: doc.sessionCode, "attendees.uid": docInner.uid
                    },{
                      $set: { "attendees.$.synch": true }
                    },
                    function(error) {
                      if(error) {
                        Logs.insert({type: "error", message: "Session COLLECTION update error. Session: "+doc.sessionCode+", Attendee:"+docInner.uid, timestamp: new Date()});
                      } else {
                        console.log('Attendee synched correctly!');
                      }
                  });
                }else{
                  Logs.insert({type: "warning", message: "SpotMe API error: "+response.data.message+", Session: "+doc.sessionCode+", Attendee:"+docInner.uid, timestamp: new Date()});
                }
              }
            });
            //End synch
          }
        });
      }
   });
   return "synchSessions executed correctly";
  },
  upsertSessions: function () {
    //Get the sessions from the server and update the local records
    HTTP.get("https://getregisterednow.com/NXP/Event/onsite/export.asp",
    {params: {l: "791", t:"fwek7uyvmc6edjncvc3cjkd", a:"sessions"}},
    function(error, result) {
      if(error){
        console.log(error);
      }else{
        if(result.content){
          var sessions = JSON.parse(result.content);
          sessions.forEach(function(session){
            Sessions.update(
               { sessionCode: session.SessionCode },
               {
                  sessionCode: session.SessionCode,
                  start: new Date(session.StartTime*1000),
                  end: new Date(session.EndTime*1000),
                  name: session.Title,
                  location: session.RoomName,
                  vip: session.IsVIP,
               },
               { upsert: true }
            );
          });
          console.log(sessions.length, " sessions processed");
        }else{
          console.log("Result not found on response from results plus");
        }
        console.log("Upsert sessions executed");
      }
    });
    return "upsertSessions executed";
  }
});

Sessions.after.update(function (userId, doc, fieldNames, modifier, options) {
  if(modifier.$push){
    var registration = doc.attendees[doc.attendees.length-1];
    var sessionCode = doc.sessionCode;
    HTTP.get("https://getregisterednow.com/NXP/Event/onsite/CheckIn.asp",
    {params: {a:"s", t: "fwek7uyvmc6edjncvc3cjkd", l:"791", u:registration.uid, s:sessionCode}},
    function(error, response){
      if(error){
        Logs.insert({type: "error", message: "HTTP endpoint GET error. Session: "+doc.sessionCode+", Attendee:"+registration.uid, timestamp: new Date()});
      }else{
        if(!response.data[0].error){
          Sessions.update({
              sessionCode: doc.sessionCode, "attendees.uid": registration.uid
            },{
              $set: { "attendees.$.synch": true }
            },
            function(error) {
              if(error) {
                Logs.insert({type: "error", message: "Session COLLECTION update error. Session: "+doc.sessionCode+", Attendee:"+registration.uid, timestamp: new Date()});
              } else {
                console.log('########################################### Attendee synched correctly!');
              }
          });
        }else{
          Logs.insert({type: "warning", message: "API error: "+response.data[0].error+", Session: "+doc.sessionCode+", Attendee:"+registration.uid, timestamp: new Date()});
        }
      }
    });
  }
}, {fetchPrevious: false});
