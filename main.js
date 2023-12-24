const electron = require("electron")
const url = require("url")
const path = require("path")   
const {app, BrowserWindow} = electron
const {setLinuxWallpaper} = require('./set_linux_env.js')
const {setWinWallpaper} = require('./set_win_env.js')
const {getFiles} = require('./files.js')

const process   = require("process")
let imagePath = "/home/alpay/Resimler/bg.png" 
let okul_tipi = 'i'


let mainWindow
app.on("ready",async ()=>{
    mainWindow = new BrowserWindow({})
    mainWindow.loadURL( 
        url.format({
            pathname:path.join(__dirname,"anasayfa.html"),
            protocol:"file:",
            slashes:true
        })
    )
    await getFiles().then((data)=>{ 
        let bg_images
        if (okul_tipi == 'i'){
            bg_images = data.bg_images.c_bg.concat(data.bg_images.i_bg) 
            imagePath = bg_images[Math.floor(Math.random()*bg_images.length)];
        }
        getEnvs()
    })
    
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

