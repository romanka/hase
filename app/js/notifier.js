/**
 * Created by annatina_vinzens on 27/10/16.
 */
const notifier = require('electron-notifications')

const prodNotification = notifier.notify('Productivity', {
    message: 'How productive were you in the past hour?',
    vertical: 'true',
    icon: 'http://cl.ly/J49B/3951818241085781941.png',
    buttons: ['Dismiss', 'Answer']
})


prodNotification.on('buttonClicked', (text) => {
   if (text === 'Dismiss') {
        console.log("Dismissed")
       prodNotification.close();
    }
    else if (text === 'Answer') {
       console.log("Answered")
       prodNotification.close();
   }
   else {
       prodNotification.close();
   }

})

// Add an event listeners
window.onload = function() {
 //notifier.notify();
};