//import {promisify} from 'node:util';
const {promisify} =  require ('node:util');
//import childProcess from 'node:child_process'; 
const childProcess =  require ('node:child_process');
//import path from 'node:path'; 
const path =  require ('node:path');
//import {fileURLToPath} from 'node:url';
const {fileURLToPath} =  require ('node:url');


// const __dirname = path.dirname(fileURLToPath(import.meta.url));
const execFile = promisify(childProcess.execFile);

// Binary source → https://github.com/sindresorhus/win-wallpaper
const binary = path.join(__dirname, 'windows-wallpaper-x86-64.exe');

module.exports.getWallpaper = async function getWallpaper() {
	const arguments_ = [
		'get',
	];

	const {stdout} = await execFile(binary, arguments_);
	return stdout.trim();
}

module.exports.setWallpaper = async function setWallpaper(imagePath, {scale = 'fill'} = {}) {
	if (typeof imagePath !== 'string') {
		throw new TypeError('Expected a string');
	}

	const arguments_ = [
		'set',
		path.resolve(imagePath),
		'--scale',
		scale,
	];

	await execFile(binary, arguments_);
}
