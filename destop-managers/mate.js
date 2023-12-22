const {commandExists, execFile, hasLine} = require ('./util.js');

module.exports.isAvailable = async function isAvailable() {
	if (!await commandExists('gsettings')) {
		return false;
	}

	try {
		const {stdout} = await execFile('gsettings', ['list-schemas']);
		return hasLine(stdout, 'org.mate.background');
	} catch {
		return false;
	}
}

module.exports.get = async function get() {
	const {stdout} = await execFile('gsettings', [
		'get',
		'org.mate.background',
		'picture-filename',
	]);

	return stdout.trim().slice(1, -1);
}

module.exports.set = async function set(imagePath) {
	await execFile('gsettings', [
		'set',
		'org.mate.background',
		'picture-filename',
		imagePath,
	]);
}
