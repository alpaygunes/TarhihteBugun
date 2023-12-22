const {commandExists, execFile} = require ('./util.js');

module.exports.isAvailable = async function isAvailable() {
	return commandExists('xfconf-query');
}

module.exports.set = async function set(imagePath) {
	await execFile('xfconf-query', [
		'--channel',
		'xfce4-desktop',
		'--property',
		'/backdrop/screen0/monitor0/image-path',
		'--set',
		`${imagePath}`,
	]);
}
