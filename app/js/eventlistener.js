/**
 * Created by annatina_vinzens on 02/11/16.
 */

// event listener


var path = require('path');

function Eventlistener() {}

Eventlistener.init = function(){
    CurrentDate.init();
    Surveys.init();
    RescueTime.init();

    document.getElementById('username_tag').innerHTML = "Romana!";

};


// Add an event listeners
window.onload = function() {
    Eventlistener.init();
};