require('update-electron-app') ({
    logger: require('electron-log')
})

const path = require('path')
const glob = require('glob')
const {BrowserWindow, Menu, app} = require('electron')
const AppMenu = require("./main-process/app-menu")

const debug = /--debug/.test(process.argv[2])

let mainWindow = null;
  
function initialize () {

  makeSingleInstance()

  function createWindow () {
    
    const windowOptions = {
      width: 1280,
      height: 840,
      
      "minWidth": 800,
      "minHeight": 600,

      title: app.getName(),
      webPreferences: {
        nodeIntegration: true
      }
    }

    if (process.platform === 'linux') {
      windowOptions.icon = path.join(__dirname, '/assets/img/ac_leaf.png')
    }

    mainWindow = new BrowserWindow(windowOptions)
    mainWindow.loadURL(path.join('file://', __dirname, '/content/index.html'))
    
    if (debug) {
      mainWindow.webContents.openDevTools()
    }

    mainWindow.on('closed', () => {
      mainWindow = null
    })
  }

  app.on('ready', () => {
    const menu = Menu.buildFromTemplate(AppMenu.Menu())
    Menu.setApplicationMenu(menu)
    createWindow()
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow()
    }
  })
}
  
// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance () {
  if (process.mas) return

  app.requestSingleInstanceLock()

  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}

initialize()
  