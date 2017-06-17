
angular.module('ftfApp', [
  'angular-meteor',
  'ionic',
  'angularUtils.directives.dirPagination'
]);

onReady = function() {
  angular.bootstrap(document, ['ftfApp']);
};

// ROOTURL = document.location.origin;
// AUDIO_SUCCESS = new Media(ROOTURL+"/success.mp3");
// AUDIO_ERROR = new Media(ROOTURL+"/error.mp3");

if(Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
  Meteor.startup(function () {
    //Using the Tag ID as check-in ID
    nfc.addTagDiscoveredListener(function (nfcEvent) {
      //console.log(byteHexstring(nfcEvent.tag.id));
      $scope = angular.element(document).scope();

      $scope.sessionCheckInbyTagId(byteHexstring(nfcEvent.tag.id));
      $scope.$apply();
      $scope = null;
    }, function () {
        console.log("NFC Tag Reading Enabled");
    }, function (reason) {
        console.log("Error adding NFC Listener " + reason);
    });
    //Block any other event
    nfc.addNdefListener(function (nfcEvent) {
        var message = nfc.bytesToString(nfcEvent.tag.ndefMessage[0].payload.slice(3));
        $scope = angular.element(document).scope();
        $scope.sessionMessage("NFC tag not encoded properly!");
        $scope.$apply();
        $scope = null;
    }, function () {
        //console.log("NFC Tag Reading Enabled");
    }, function (reason) {
        console.log("Error adding NFC Listener " + reason);
    });
    nfc.addMimeTypeListener("text/x-vcard", function (nfcEvent) {
        //console.log(JSON.stringify(nfcEvent.tag));
        $scope = angular.element(document).scope();
        var message = nfc.bytesToString(nfcEvent.tag.ndefMessage[0].payload.slice(3));
        attendee = parseVcard(message);
        $scope.sessionCheckIn(attendee);
        $scope.$apply();
        $scope = null;
    }, function () {
        //console.log("NFC Tag Reading Enabled");
    }, function (reason) {
        console.log("Error adding NFC Listener " + reason);
    });
  });
} else {
  angular.element(document).ready(onReady);
}
