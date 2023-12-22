const {setWallpaper}  = require('./destop-managers/windows.js');

module.exports.setWinWallpaper = async function setWinWallpaper(imagePath){
	await setWallpaper(imagePath, {scale = 'fill'} = {})
}