/**
 * Created by Romi on 26.10.16.
 */

var path = require('path');
var https = require('https');

function RescueTime() {}



var APIkey = ""
var date = ""
var data = ""
var rescueTime_data = []


RescueTime.init = function(){
    //if(user === 'Romi'){
    APIkey = "B63kYcoSejauNC0Fr2ULEfTTI_LGC2YPL9klMf_B"
    date = "2016-10-27"
};

RescueTime.getTracking = function(){
        /*$http({
         method: "GET",
         url: "https://www.rescuetime.com/anapi/data?key="&APIkey&"&perspective="&perspective&"&interval="&interval&"&restrict_begin="&restrict&"2016-10-26T10&restrict_end="&restrict&"2016-10-26&format=json"
         }).then(function successCallback(response){
         var data = response
         })*/

    console.log("hi2")
    var url_begin = "https://www.rescuetime.com/anapi/data?key=";
    var url_r_begin = "&format=json&perspective=interval&restrict_kind=productivity&interval=hour&restrict_begin=";
    var url_r_end = "&restrict_end=";

    var url = url_begin.concat(APIkey).concat(url_r_begin).concat(date).concat(url_r_end);

        var foo = '';
        var req = https.get(url, function (res) {
                res.on('data', function (more) {
                    foo += more;
                });
                res.on('end', function () {
                    data = JSON.parse(foo).rows;
                    console.log(data);
                    RescueTime.parseData();

                });

            });
        req.on('error', function(err) {
            console.log(err);
    });
};

RescueTime.parseData = function(){
        for (var i = 0; i < data.length; i++) {
            rescueTime_data.push({
                time: data[i][0],
                value: data[i][1]
            });
        }
        console.log(rescueTime_data);
};

// Add an event listeners
window.onload = function() {
    RescueTime.init();
    RescueTime.getTracking();
};
