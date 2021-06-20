const { app, BrowserWindow } = require("electron")
const path = require("path")

createWindow = () =>
{
    const win = new BrowserWindow({
        width: 800,
        height: 900,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        },
        backgroundColor: '#c1e7c6'
        
    })
    
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
      })
      
    win.once('ready-to-show', () => {
        win.show()
      })

    win.loadFile('index.html')
}
app.on('window-all-closed', () => {
    if(process.platform !== "darwin") app.quit()
})
app.whenReady().then(()=>
{
    createWindow()
})