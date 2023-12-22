const {commandExists, execFile} = require ('./util.js');

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
	await execFile('gsettings', [
		'set',
		'org.gnome.desktop.background',
		'picture-uri',
		`file://${imagePath}`,
	]);
}
