const {app, BrowserWindow, dialog} = require('electron')
const url = require('url')
const path = require('path')

let win

function createWindow() {
   win = new BrowserWindow({width: 800, height: 600,  webPreferences: {nodeIntegration: true}})
   win.loadURL(url.format ({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
   }))
}

const loadImgFile = exports.loadImgFile = () => {
   const files = dialog.showOpenDialogSync(win, {
      properties: ['openFile']
   })

   if(!files) {return;}

   const file = files[0]
   return file
}

app.on('ready', createWindow)