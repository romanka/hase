/**
 * Created by Romi on 26.10.16.
 */

var path = require('path');
var https = require('https');

var chart_data;
var time;
var chart_colors = [];

var APIkey = ""
var date = ""
var data = ""
var rescueTime_data_simple = []     // time, value
var rescueTime_data_complex = []    // time, activity, value, productivity
var hour_total = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
var hour_productive = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
var finished = false;
var percentageProductive=0;

function RescueTime() {}

RescueTime.init = function(){

    var current_date = new Date();
    var day = ('0' + (current_date.getDate())).slice(-2);
    var month = current_date.getMonth() +1;
    var year = current_date.getFullYear();

    //correct date & time assignment
    /*
    time =  current_date.getHours()-1; //get last hour not current hour
    date = year + "-" + month + "-" + day;
   */

    //for testing:
    var yesterday = ('0' + (current_date.getDate()-1)).slice(-2);
    time = 14;
    date = year + "-" + month + "-" + yesterday;

    //if(user === 'Romi'){
    APIkey = "B63kYcoSejauNC0Fr2ULEfTTI_LGC2YPL9klMf_B"

    RescueTime.getTracking();
};

//HTTPS Call to RescueTime Data API to receive data
RescueTime.getTracking = function(){
        /*$http({
         method: "GET",
         url: "https://www.rescuetime.com/anapi/data?key="&APIkey&"&perspective="&perspective&"&interval="&interval&"&restrict_begin="&restrict&"2016-10-26T10&restrict_end="&restrict&"2016-10-26&format=json"
         }).then(function successCallback(response){
         var data = response
         })*/

    var url_begin = "https://www.rescuetime.com/anapi/data?key=";
    var url_r_begin = "&format=json&perspective=interval&interval=hour&restrict_begin=";
    var url_r_end = "&restrict_end=";

    var url = url_begin.concat(APIkey).concat(url_r_begin).concat(date).concat(url_r_end).concat(date);

        var foo = '';
        var req = https.get(url, function (res) {
                res.on('data', function (more) {
                    foo += more;
                });
                res.on('end', function () {
                    data = JSON.parse(foo).rows;
                    RescueTime.parseData();
                    finished = true;
                });
            });
        req.on('error', function(err) {
            console.log(err);
    });
};

/*  Data Format
    data[][0] = Timestamp YYYY-MM-DDThh:mm:ss   --> using HOUR as index in hour_total and hour_productive
    data[][1] = Time spent (seconds)
    data[][2] = Number of people                --> ignore
    data[][3] = Activity
    data[][4] = Cetegory                        --> ignore
    data[][5] = Productivity
 */
RescueTime.parseData = function(){
    for (var i = 0; i < data.length; i++) {
        var timestamp = data[i][0];
        
        var index = parseInt(timestamp.slice(11,13));
        hour_total[index] += data[i][1];
        if(data[i][5]===1 || data[i][5]===2){
            hour_productive[index] += data[i][1];
        }
    }

    //rescueTime Data in comoplex data format for pie chart or each hour
    var time_others_productive= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var time_others_unproductive= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    for (var i = 0; i < data.length; i++) {
        var index = parseInt(data[i][0].slice(11,13));
        if(Math.round(data[i][1]/60)>1){
            rescueTime_data_complex.push({
                time: index,
                activity: data[i][3],
                value: Math.round(data[i][1]/60),
                productivity: (data[i][5]>1) ? (1) : (0)
            })
        } else {
            if(data[i][5]===1 || data[i][5]===2){
                time_others_productive[index] += data[i][1];
            } else {
                time_others_unproductive[index] += data[i][1];
            }
        }
    }

    //rescueTime Data in comoplex data format for pie chart other productive and unproductive
    for (var i = 0; i < hour_total.length; i++) {
        //push others productive
        if(time_others_productive[i]>0) {
            rescueTime_data_complex.push({
                time: i,
                activity: "other productive",
                value: Math.round(time_others_productive[i] / 60),
                productivity: 1
            })
        }
        //push others unproductive
        if(time_others_unproductive[i]>0) {
            rescueTime_data_complex.push({
                time: i,
                activity: "other unproductive",
                value: Math.round(time_others_unproductive[i] / 60),
                productivity: 0
            })
        }
    }

    //rescueTime Data in simple data format for bar chart
    for (var i = 0; i < hour_total.length; i++) {
        rescueTime_data_simple.push({
            time: i,
            value: Math.round(hour_productive[i]/hour_total[i]*100).toString()
        });
    }

    dataRTPieRenderer();
    drawRTPieChart();
};

//Draw RescueTime Pie Chart
drawRTPieChart = function (){
    var options = {
        title: 'Productivity',
        titleTextStlye: {
            fontSize: 14,
            bold: true,
            color: 'black'
        },
        pieSliceText: 'percentage',
        pieHole: 0.4,
        legend: 'none',
        tooltip: {isHtml: true, ignoreBounds: true},
        allowHtml: true,
        backgroundColor: 'transparent',
        chartArea: {left: 10, top: 10, width: '90%', height: '90%'},
        width: 350,
        height:280,
        colors: chart_colors
    }

    var chart = new google.visualization.PieChart(document.getElementById('productivity_box'));
    chart.draw(chart_data, options);
    document.getElementById('productivity_span').innerHTML = calculatePercentageProductive();
}

//Generate RescueTime Data to show in Pie Chart
dataRTPieRenderer = function () {

    chart_data = new google.visualization.DataTable();
    chart_data.addColumn('string', 'Task');
    chart_data.addColumn('number', 'minutes');
    chart_data.addColumn({type: 'string', role:'tooltip'}); //custom tooltip

    var count_productive=0;
    var count_unproductive=0;

    rescueTime_data_complex.sort(function(a,b){
        if (parseInt(a.value) < parseInt(b.value)) {
            return 1;
        }
        if (parseInt(a.value) > parseInt(b.value)) {
            return -1;
        }
        return 0;
    });

    console.log(rescueTime_data_complex);

    //add productive activities
    rescueTime_data_complex.forEach(function(entry){
        if (entry["time"] === time) {
            if(parseInt(entry.productivity) > 0){
                var act = entry.activity.toString();
                var value = parseInt(entry.value);
                chart_data.addRow([act, value, act]);
                chart_colors.push(rgbToHex(18/255,121/255,35/255,(255-(count_productive*30))/255));
                count_productive++;
            }
        }
    });

    //add unproductive activities
    rescueTime_data_complex.forEach(function(entry){
        if (entry["time"] === time) {
            if(parseInt(entry.productivity) < 1){
                var act = entry.activity.toString();
                var value = parseInt(entry.value);
                chart_data.addRow([act, value, act]);
                chart_colors.push(rgbToHex(180/255,29/255,29/255,(255-(count_unproductive*30))/255));
                count_unproductive++;
            }
        }
    });

    //add unlogged time
    var unlogged = (3600-hour_total[time])/60;
    chart_data.addRow(['Unlogged', unlogged, 'Unlogged Time']);
    chart_colors.push('#8B8378');


}

//Percentatge of productiveness
function calculatePercentageProductive(){
    return (Math.round(parseInt(hour_productive[time])/36)).toString().concat("%");
};

/**
 *  Functions for color calculations
 **/
function rgbToHex(r, g, b, a) {
    var nr = Math.round(((1-a)+(a*r))*255);
    var ng = Math.round(((1-a)+(a*g))*255);
    var nb = Math.round(((1-a)+(a*b))*255);
    return "#" + componentToHex((nr>255?255:nr)) + componentToHex((ng>255?255:ng)) + componentToHex((nb>255?255:nb));
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
