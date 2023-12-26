const electron = require("electron")
const url = require("url")
const path = require("path")
const fs = require('node:fs');
const { app, BrowserWindow, ipcMain } = electron
const { setLinuxWallpaper } = require('./set_linux_env.js')
const { setWinWallpaper } = require('./set_win_env.js')
const { getFiles } = require('./files.js')
const process = require("process");
const { log } = require("console");
const { start } = require("repl");
let imagePath = "/home/alpay/Resimler/bg.png"
let okul_tipi = 'ilkokul'
let mainWindow
var hasWindowLoaded = false;
var AutoLaunch = require('auto-launch');


app.on("ready", async () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })
    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "/assets/anasayfa.html"),
            protocol: "file:",
            slashes: true
        })
    )

    await getAll()
})

const getEnvs = async function getEnvs() {
    if (process.platform === 'darwin') {
        // wallpaper = macos;
    } else if (process.platform === 'win32') {
        await setWinWallpaper(imagePath)
    } else {
        await setLinuxWallpaper(imagePath)
    }
}

function writeHtmlToFront(html_files) {
    let html_file
    html_file = html_files[Math.floor(Math.random() * html_files.length)];
    let content = new Promise((resolve, reject) => {
        fs.readFile(html_file, 'utf8', (err, data) => {
            if (err) {
                reject(err)
            }
            resolve(data)
        });
    })

    content.then((data) => {
        // view yüklenmesi bitince datayı viewe gönder 
        //view zaten yüklü ise "did-finish-load" gerek yok direk gönder
        if (hasWindowLoaded) {
            mainWindow.webContents.send("data:write", data)
        } else {
            mainWindow.webContents.on('did-finish-load', function () {
                mainWindow.webContents.send("data:write", data)
                hasWindowLoaded = true
            });
        }
    })

}

async function getAll() {
    // kayıtlı verileri okuyalım
    // read file
    const storage_path = app.getPath("userData")
    fs.readFile(path.join(storage_path, '/user-data.json'), { encoding: 'utf-8' }, (err, data) => {
        if (err) {
            //eğer okul tipi yoksa ilk tüklemedir. okul tipi seçtirelim
            // view yüklenmesi bitince datayı viewe gönder
            // if (hasWindowLoaded) {
            //     mainWindow.webContents.send("okultipi_sec", true)
            // } else { 
                mainWindow.webContents.on('did-finish-load', function () {
                    mainWindow.webContents.send("okultipi_sec", true)
                    hasWindowLoaded = true
                });
            // } 

            return
        }
        okul_tipi = JSON.parse(data).okul_tipi
    })

    await getFiles().then((data) => {
        let bg_images
        let html_files
        if (okul_tipi == 'ilkokul') {
            bg_images = data.bg_images.c_bg.concat(data.bg_images.i_bg)
            imagePath = bg_images[Math.floor(Math.random() * bg_images.length)];
            html_files = data.html_files.c_html.concat(data.html_files.i_html)
        } else if (okul_tipi == 'ortaokul') {
            bg_images = data.bg_images.c_bg.concat(data.bg_images.o_bg)
            imagePath = bg_images[Math.floor(Math.random() * bg_images.length)];
            html_files = data.html_files.c_html.concat(data.html_files.o_html)
        } else if (okul_tipi == 'lise') {
            bg_images = data.bg_images.c_bg.concat(data.bg_images.l_bg)
            imagePath = bg_images[Math.floor(Math.random() * bg_images.length)];
            html_files = data.html_files.c_html.concat(data.html_files.l_html)
        }
        getEnvs()
        writeHtmlToFront(html_files)
    })
}

// Çıkış
ipcMain.on("exit", (err, data) => {
    app.quit()
})

// okul türünü değiştir
ipcMain.on("change:type", async (err, type) => {
    okul_tipi = type
    await getAll()



    // write file  
    const storage_path = app.getPath("userData")
    const user_data = JSON.stringify({ "okul_tipi": okul_tipi })
    new Promise((resolve, reject) => {
        fs.writeFile(path.join(storage_path, '/user-data.json'), user_data, (err, data) => {
            if (err) {
                reject(err)
            }
            resolve(data)
        });
    })

})



// Linuz başlangıçta çalışma
var autoLauncher = new AutoLaunch({
    name: "Tarihte Bugün"
});

autoLauncher.isEnabled().then(function(isEnabled) {
    if (isEnabled) return;
     autoLauncher.enable();
  }).catch(function (err) {
    throw err;
  });