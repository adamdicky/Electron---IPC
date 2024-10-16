console.log('main process is working');
console.log('from main.js');

const electron = require("electron"); //from nodes module package that we installed

//sub modules//
const app = electron.app;
const BrowserWindow = electron.BrowserWindow; //window for UI, from electron-- responsible for all UI related 
const path = require("path"); //build file path
const url = require("url"); //building a appropriate URL
const ipc = electron.ipcMain;
const dialog = electron.dialog;


let win; //declaring variable, so win = window1

function createWindow(){ //function

    
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    }); //by default window is 800x600pix
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));

    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null; //garbage collected
    });
  
   /* 
   
   2 types of IPC:
     1. synchronous - blocks other operation while completing its task
     2. asynchronous - does not block other operations while completing its task

   */
}

ipc.on('open-error-dialog', function() {
    console.log('open-error-dialog event received');
    dialog.showErrorBox('An error message','Demo of an error message.'); //Title, then the body
    Event.sender.send('opened-error-dialog', 'Main proces opened the error dialog');
});

ipc.on('async-message', function() {
    console.log('open-error-dialog event received');
    dialog.showErrorBox('An error message','Demo of an error message.'); //Title, then the body
    Event.sender.send('async-reply', 'Main proces opened the error dialog');
});

app.on('ready', createWindow); //ready is when all initilization is done