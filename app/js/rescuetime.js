/**
 * Created by Romi on 26.10.16.
 */

function RescueTime() {}

RescueTime.init = function(user){
    //if(user === 'Romi'){
    APIkey = "B63kYcoSejauNC0Fr2ULEfTTI_LGC2YPL9klMf_B"
    perspective = "interval"
    interval = "hour"
    restrict = ""
}

var APIkey = ""
var perspective = ""
var interval = ""
var restrict = ""

RescueTime.getTracking = function($scope, $http){
  $http({
      method: "GET",
      url: "https://www.rescuetime.com/anapi/data?key="&APIkey&"&perspective="&perspective&"&interval="&interval&"&restrict_begin="&restrict&"2016-10-26T10&restrict_end="&restrict&"2016-10-26&format=json"
  }).then(function successCallback(response){
      var data = response
  })
};
