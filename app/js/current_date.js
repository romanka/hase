/**
 * Created by annatina_vinzens on 01/11/16.
 */

var path = require('path');
var current_date;

function CurrentDate() {}

CurrentDate.init = function(){
    current_date = new Date();
    CurrentDate.setToday();
};


CurrentDate.getToday = function() {
    return current_date;
}

CurrentDate.setToday = function (){
    //weekday
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var weekday = days[current_date.getDay()];

    //date
    var day = ('0'+current_date.getDay()).slice(-2);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var month = months[current_date.getMonth()];
    var year = current_date.getFullYear();
    var date = day + " " + month + " " + year;

    //time
    var hour = current_date.getHours();
    var min = ('0'+current_date.getMinutes()).slice(-2);
    var time = hour + ":" + min;

    document.getElementById("weekday").innerHTML = weekday;
    document.getElementById("date").innerHTML = date + " " + time;

}


// Add an event listeners
window.onload = function() {
    CurrentDate.init();
};

