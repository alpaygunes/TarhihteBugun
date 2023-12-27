const path = require('path');
const fs = require('fs');
let directoryPath

module.exports.getFiles = async function getFiles() {
    directoryPath = getDataFoldersPath() 
    return { "bg_images": await getBgImages(), "html_files": await getHtmlFiles() }
}

function getDataFoldersPath() {
    var date = new Date();
    var month = date.getMonth();
    var day = date.getDate();
    let pth = path.join(month.toString(), day.toString())
    if (process.env.APP_DEV){
        return path.join(__dirname, 'data', pth);
    }else{
        return path.join(__dirname, '../..','data', pth);
    }
    
}

function getBgImages() {
    let c_bg = [], i_bg = [], o_bg = [], l_bg = []
    let bg_path = path.join(directoryPath, 'bg')

    return new Promise((resolve, reject) => {
        fs.readdir(bg_path, async function (err, files) {
            if (err) {
                reject(err);
            }

            let _files = new Promise((resolve, reject) => {
                files.map((fn) => {
                    if (fn.endsWith('.jpg') || fn.endsWith('.webp') || fn.endsWith('.png')) {
                        if (fn.startsWith('c')) {
                            c_bg.push(path.join(bg_path, fn))
                        } else if (fn.startsWith('i')) {
                            i_bg.push(path.join(bg_path, fn))
                        } else if (fn.startsWith('o')) {
                            o_bg.push(path.join(bg_path, fn))
                        } else if (fn.startsWith('l')) {
                            l_bg.push(path.join(bg_path, fn))
                        }
                    }
                });
                resolve({ "c_bg": c_bg, "i_bg": i_bg, "o_bg": o_bg, "l_bg": l_bg });
            })
            _files.then((data) => {
                resolve(data);
            })
        });
    });
}

function getHtmlFiles() {
    let c_html = [], i_html = [], o_html = [], l_html = []
    let html_path = path.join(directoryPath, 'html')


    return new Promise((resolve, reject) => {
        fs.readdir(html_path, async function (err, files) {
            if (err) {
                reject(err);
            }

            let _files = new Promise((resolve, reject) => {
                files.map((fn) => {
                    if (fn.endsWith('.html')) {
                        if (fn.startsWith('c')) {
                            c_html.push(path.join(html_path, fn))
                        } else if (fn.startsWith('i')) {
                            i_html.push(path.join(html_path, fn))
                        } else if (fn.startsWith('o')) {
                            o_html.push(path.join(html_path, fn))
                        } else if (fn.startsWith('l')) {
                            l_html.push(path.join(html_path, fn))
                        }
                    }
                });
                resolve({ "c_html": c_html, "i_html": i_html, "o_html": o_html, "l_html": l_html });
            })
            _files.then((data) => {
                resolve(data);
            })
        });
    });
}



//   xfconf-query -c xfce4-desktop -p /backdrop/screen0/monitorDP-1 -lv
//   ile dönen değerlerin içinden gertekeni çek