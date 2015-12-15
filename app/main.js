// app/main.js

// Module to control application life.
var app = require('app');

// Module to create native browser window.
var BrowserWindow = require('browser-window');
var mainWindow = null;

require('electron-debug')({
    showDevTools: true
});

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finisehd
// initialization and is ready to create browser windows.
app.on('ready', function() {

  // Create the brwoser window.
  mainWindow = new BrowserWindow({ width: 800, height: 800});

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Emitted when the window in closed
  mainWindow.on('closed', function() {
    // Deference the window object, usually you would store
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element
    mainWindow = null;
  });

});
