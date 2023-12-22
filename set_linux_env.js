const managers  = require('./destop-managers/index.js');
const path = require('node:path');
let availableApps;




async function setAvailableApps() {
	availableApps = [];

	const promises = Object.values(managers).map(async manager => {
		if (await manager.isAvailable()) { 
			availableApps.push(manager); 
		}
	});

	await Promise.all(promises);
}


module.exports.setLinuxWallpaper = async function setLinuxWallpaper(imagePath) {
	if (typeof imagePath !== 'string') {
		throw new TypeError('Expected a string');
	}

	if (!availableApps) {
		await setAvailableApps();
		await setLinuxWallpaper(imagePath);
		return;
	}

	const promises = availableApps.map(async app => {
		if (typeof app.set === 'function') {
			await app.set(path.resolve(imagePath));
		}
	});

	await Promise.allSettled(promises);
}