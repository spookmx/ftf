
angular.module('ftfApp', [
  'angular-meteor',
  'ionic',
  'angularUtils.directives.dirPagination',
  'accounts.ui'
]);

onReady = function() {
  angular.bootstrap(document, ['ftfApp']);
};



if(Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
  Meteor.startup(function () {
    nfc.addMimeTypeListener("text/x-vcard", function (nfcEvent) {
        //alert(JSON.stringify(nfcEvent.tag));
        $scope = angular.element(document).scope();
        var message = nfc.bytesToString(nfcEvent.tag.ndefMessage[0].payload.slice(3));
        attendee = parseVcard(message);
        $scope.sessionCheckIn(attendee);
        $scope.$apply();
        $scope = null;
    }, function () {
        //alert("NFC Tag Reading Enabled");
    }, function (reason) {
        alert("Error adding NFC Listener " + reason);
    });
  });
} else {
  angular.element(document).ready(onReady);
}
