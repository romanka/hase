/**
 * Created by Romi on 26.10.16.
 */

/*function RescueTime() {}

RescueTime.init = function(){
    //if(user === 'Romi'){
    APIkey = "B63kYcoSejauNC0Fr2ULEfTTI_LGC2YPL9klMf_B"
    perspective = "interval"
    interval = "hour"
    restrict = ""
}

var APIkey = ""
var perspective = ""
var interval = ""
var restrict = ""*/

getTracking = function(){
        /*$http({
         method: "GET",
         url: "https://www.rescuetime.com/anapi/data?key="&APIkey&"&perspective="&perspective&"&interval="&interval&"&restrict_begin="&restrict&"2016-10-26T10&restrict_end="&restrict&"2016-10-26&format=json"
         }).then(function successCallback(response){
         var data = response
         })*/

        console.log("hi2")
        var APIkey = "B63kYcoSejauNC0Fr2ULEfTTI_LGC2YPL9klMf_B"
        var perspective = "interval"
        var interval = "hour"
        var restrict = ""

        var url = "https://www.rescuetime.com/anapi/data?key=" & APIkey & "&perspective=" & perspective & "&interval=" & interval & "&restrict_begin=" & restrict & "2016-10-26T10&restrict_end=" & restrict & "2016-10-26&format=json"

        var foo = '';
        https.get('https://www.rescuetime.com/anapi/data?key=b63kycosejaunc0fr2uleftti_lgc2ypl9klmf_b&perspective=interval&interval=hour&restrict_begin=2016-10-26t10&restrict_end=2016-10-26&format=json'
            , function (res) {
                response = res.statusCode;

                console.log(res.statusCode);

                res.on('data', function (more) {
                    foo += more;
                })
                res.on('end', function () {
                    data = JSON.parse(foo).rows;
                    console.log(data);
                })

            })
    }
