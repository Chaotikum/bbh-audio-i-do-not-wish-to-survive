const electron = require('electron')
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path')
const url = require('url')

const isKiosk = process.argv.includes('--kiosk')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let priWindow

function createWindow () {
  var priDisplay = electron.screen.getPrimaryDisplay()

  priWindow = fullscreenWindowForDisplay(priDisplay)
  priWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'primary.html'),
    protocol: 'file:',
    slashes: true
  }))
}

function fullscreenWindowForDisplay(display) {
  return new BrowserWindow({
    width: isKiosk ? display.workAreaSize.width : 1280,
    height: isKiosk ? display.workAreaSize.height : 800,
    x: display.bounds.x,
    y: display.bounds.y,
    fullscreen: isKiosk,
    backgroundColor: '#000',
    closable: !isKiosk,
    kiosk: isKiosk,
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (priWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
