var electron, path, json;

path = require('path');
json = require('../../package.json');

electron = require('electron');

electron.app.on('ready', function() {
  var window;

  window = new electron.BrowserWindow({
    title: json.name,
    width: json.settings.width,
    height: json.settings.height,
  });

  window.loadURL('file://' + path.join(__dirname, '..', '..') + '/index.html');

//Adding developer tools
  window.openDevTools();

  window.webContents.on('did-finish-load', function(){
    window.webContents.send('loaded', {
      appName: json.name,
    });
  });

  window.on('closed', function() {
    window = null;
  });
});
