const {BrowserWindow, app, shell, remote} = require('electron')

module.exports = {

    Menu: () => {

        let AppMenu = [{
            label: 'File',
            submenu: [{
                label: 'Quit',
                accelerator: 'Ctrl+Q',
                click: () => { 
                    remote.getCurrentWindow().close();    
                }
            }]
        }, {
            label: 'View',
            submenu: [{
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click: (item, focusedWindow) => {
                    if (focusedWindow) {
                        if (focusedWindow.id === 1) {
                            BrowserWindow.getAllWindows().forEach(win => {
                                if (win.id > 1) win.close()
                            })
                        }    
                        focusedWindow.reload()
                    }
                }
            }, {
                label: 'Toggle Full Screen',
                accelerator: (() => {
                    if (process.platform === 'darwin') {
                        return 'Ctrl+Command+F'
                    } else {
                        return 'F11'
                    }
                })(),
                click: (item, focusedWindow) => {
                    if (focusedWindow) {
                        focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
                    }
                }
            }, {
                label: 'Toggle Developer Tools',
                accelerator: (() => {
                    if (process.platform === 'darwin') {
                        return 'Alt+Command+I'
                    } else {
                        return 'Ctrl+Shift+I'
                    }
                })(),
                click: (item, focusedWindow) => {
                    if (focusedWindow) {
                        focusedWindow.toggleDevTools()
                    }
                }
            }]
          }, {
            label: 'Window',
            role: 'window',
            submenu: [{
              label: 'Minimize',
              accelerator: 'CmdOrCtrl+M',
              role: 'minimize'
            }, {
              label: 'Close',
              accelerator: 'CmdOrCtrl+W',
              role: 'close'
            }, {
              type: 'separator'
            }, {
              label: 'Reopen Window',
              accelerator: 'CmdOrCtrl+Shift+T',
              enabled: false,
              key: 'reopenMenuItem',
              click: () => {
                app.emit('activate')
              }
            }]
          }, {
            label: 'Project',
            role: 'project',
            submenu: [{
                label: 'See Project Repository',
                click: () => {
                    shell.openExternal('https://github.com/bradendubois/animal-crossing-nh-villager-tracker')
                }
            }, {
                label: 'Open an Issue',
                click: () => {
                    shell.openExternal('https://github.com/bradendubois/animal-crossing-nh-villager-tracker/issues')
                }
            }, {
                label: 'See My Other Projects',
                click: () => {
                    shell.openExternal('https://github.com/bradendubois');
                }
            }]
          }]
          
          return AppMenu;
    }
}