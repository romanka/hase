/**
 * Created by Romi on 26.10.16.
 */

const {app, BrowserWindow} = require('electron')
var https = require('https')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({width: 800, height: 600, resizable: false,})

    // and load the index.html of the app.
    win.loadURL(`file://${__dirname}/app/index.html`)

    // Open the DevTools.
    win.webContents.openDevTools()

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
})
}

function getTracking(){

    var foo = '';
   https.get('https://www.rescuetime.com/anapi/data?key=b63kycosejaunc0fr2uleftti_lgc2ypl9klmf_b&perspective=interval&interval=hour&restrict_begin=2016-10-26t10&restrict_end=2016-10-26&format=json'
       , function(res){
           response = res.statusCode;

           console.log(res.statusCode);

           res.on('data', function(more){
               foo += more;
           })
           res.on('end', function(){
               data = JSON.parse(foo).rows;
               console.log(data);
           })

       })
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    createWindow();
    console.log("hi");

})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
    app.quit()
}
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {

        createWindow();

    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.