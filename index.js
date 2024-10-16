const electron = require("electron");
const ipc = electron.ipcRenderer;

const asyncBtn = document.getElementById('asyncBtn');

errorBtn.addEventListener('click', function() {
    console.log('asnyc msg 1');
    ipc.send('async-message');
    console.log('asnyc msg 2');

});

ipc.on('async-message', function(event, arg){
    console.log(arg);
})