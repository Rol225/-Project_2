const path = require('path');
const url = require('url');
const {app, BrowserWindow, screen} = require('electron');

let win;

function createWindow(){
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  win = new BrowserWindow({
    width,
    height,
    webPreferences:{
      nodeIntegration: true,
      contextIsolation: false
    }

  });
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  win.setMenu(null)
  //win.webContents.openDevTools();
  win.on('cloused', () => {
    win = null;
  });
}

app.on('ready', createWindow);
