const {promisify} 	= require('node:util');
const childProcess 	= require('node:child_process');
const {promises , fsPromises} 		= require('node:fs'); 

const execFile = promisify(childProcess.execFile);
module.exports.execFile = execFile

const exec 	= promisify(childProcess.exec);
module.exports.exec 	= promisify(childProcess.exec);

module.exports.commandExists = async function commandExists(command) {
	// `which` all commands and expect stdout to return a positive
	try {
		let {stdout} = await execFile('which', ['-a', command]);
		stdout = stdout.trim();

		if (!stdout) {
			return false;
		}

		return true;
	} catch {
		return false;
	}
}

module.exports.hasLine = function hasLine(string, lineToFind) {
	return string.split('\n').find(line => line.trim() === lineToFind);
}

const readFile = fsPromises;
module.exports.readFile = readFile