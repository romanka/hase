/**
 * Created by annatina_vinzens on 01/11/16.
 */

var path = require('path');
var today;
var current_date;

function CurrentDate() {}

CurrentDate.init = function(){
    current_date = new Date();
    setToday();
};


CurrentDate.getToday = function() {
    return today;
}

CurrentDate.setToday = function (){
    today = current_date.getDate() // day
}


// Add an event listeners
window.onload = function() {
    CurrentDate.init();
};

