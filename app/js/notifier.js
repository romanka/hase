/**
 * Created by annatina_vinzens on 27/10/16.
 */
var notifier = require('node-notifier');
var nc = new notifier.NotificationCenter();

var notification_options = {
    title: 'Productivity',
    message: 'How productive were you in the past hour?',
    //vertical: true,
    icon: null, //put the logo here!
    closelabel: 'Dismiss',
    actions: ["1","2","3","4","5","6","7"],
    //buttons: ['Dismiss', 'Answer'],
    wait: true
};


// Add an event listeners
window.onload = function() {

    /*Notification.requestPermission();
    var notify = new Notification('Productivity', {
        body: 'How productive were you in the past hour?',
        requireInteraction: true
    });

    console.log("I am here");
    
    notify.onclick = function(event) {
        event.preventDefault();
        console.log("Notification was clicked. Finally!");
        //surveyWindow_hour.show();
    };*/

    /*nc.notify(notification_options, function(err, response, metadata){
        console.log(response);
    });
    //setTimeout(notifier.close.bind(notifier),120000);
    notifier.on('click', function (notifierObject, options) {

        notifier.close();
        surveyWindow_hour.show();
    });

    nc.on('replied', function (obj, options, metadata) {
        console.log('User replied', metadata);
    })*/

    
};