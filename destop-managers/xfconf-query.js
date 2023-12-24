const {commandExists, execFile} = require ('./util.js');

module.exports.isAvailable = async function isAvailable() {
	return commandExists('xfconf-query');
}

module.exports.set = async function set(imagePath) {
	await execFile('xfconf-query', [
		'--channel',
		'xfce4-desktop',
		'--property',
		'/backdrop/screen0/monitorDP-1/workspace0/last-image',
		'--set',
		`${imagePath}`,
	]);
}
