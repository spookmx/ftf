//Json to CSV

JSON2CSV = function (objArray, plain) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;

    var str = '';
    var line = '';

    if(!plain){
      var head = array[0];
      for (var index in array[0]) {
          var value = index + "";
          line += '"' + value.replace(/"/g, '""') + '",';
      }
    }


    line = line.slice(0, -1);
    str += line + '\r\n';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
          if(index == "attendees"){
            var value = JSON2CSV(array[i][index], true)+"";
            line += '"' + value.replace(/"/g, '""') + '",';
          }else{
            var value = array[i][index] + "";
            line += '"' + value.replace(/"/g, '""') + '",';
          }
        }

        line = line.slice(0, -1);
        str += line + '\r\n';
    }
    return str;

};
