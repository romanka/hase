/**
 * Created by Romi on 27.10.16.
 */

var path = require('path');
var https = require('https');
//var app = require('app')
const BrowserWindow = require('electron').remote.BrowserWindow;
//var ipc = require('ipc')
function Surveys() {}

Surveys.init = function(){


    console.log("....")
    var survey = new BrowserWindow ({
        width: 600,
        height: 400,
        resizable: false
    })

    survey.loadURL('file://' + __dirname + '/survey.html')

};

Surveys.getAnswers = function(){

}


// Add an event listeners
window.onload = function() {
    Surveys.init();
};