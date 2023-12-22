const electron = require("electron")
const url = require("url")
const path = require("path")   
const {app, BrowserWindow} = electron
const {setLinuxWallpaper} = require('./set_linux_env.js')
const {setWinWallpaper} = require('./set_win_env.js')

const process   = require("process")
let imagePath = "/home/alpay/Resimler/bg.png"


let mainWindow
app.on("ready",()=>{
    mainWindow = new BrowserWindow({})
    mainWindow.loadURL( 
        url.format({
            pathname:path.join(__dirname,"anasayfa.html"),
            protocol:"file:",
            slashes:true
        })
    )
    getEnvs()
})


const getEnvs = async function getEnvs(){
    if (process.platform === 'darwin') {
        // wallpaper = macos;
     } else if (process.platform === 'win32') {
        await setWinWallpaper(imagePath)
     } else {  
        await setLinuxWallpaper(imagePath)
     } 
}