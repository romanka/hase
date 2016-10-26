/**
 * Created by Romi on 26.10.16.
 */

function RescueTime() {}

RescueTime.getTracking = function($scope, $http){
  $http({
      method: "GET",
      url: "https://www.rescuetime.com/anapi/data?key=B63kYcoSejauNC0Fr2ULEfTTI_LGC2YPL9klMf_B&perspective=interval&interval=hour&restrict_begin=2016-10-26T10&restrict_end=2016-10-26&format=json"
  }).then(function successCallback(response){
      var data = response
  })
};
