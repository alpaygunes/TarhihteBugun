const {commandExists, execFile} = require ('./util.js');
const electron = require("electron")
const { BrowserWindow } = electron

module.exports.isAvailable = async function isAvailable() {
	return commandExists('gsettings');
}

module.exports.get = async function get() {
	const {stdout} = await execFile('gsettings', [
		'get',
		'org.gnome.desktop.background',
		'picture-uri',
	]);

	return stdout.trim().slice(8, -1);
}

module.exports.set =  async function set(imagePath) {
	//const ID = process.env.MAIN_WINDOW_ID * 1;
	// console.log(BrowserWindow.fromId(ID)) 
	// console.log(BrowserWindow.getFocusedWindow()) 
	
	let a = await execFile('gsettings', [
		'set',
		'org.gnome.desktop.background',
		'picture-uri',
		`file://${imagePath}`,
	]);
	//BrowserWindow.getFocusedWindow().webContents.send("gnome_bg_degisti", a)
	//console.log(a)
}
