import sha1 from 'node-sha1'
import fs from 'fs'
import path from 'path'

Object.compare = function (obj1, obj2) {
	//Loop through properties in object 1
	for (var p in obj1) {
		//Check property exists on both objects
		if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;
 
		switch (typeof (obj1[p])) {
			//Deep compare objects
			case 'object':
				if (!Object.compare(obj1[p], obj2[p])) return false;
				break;
			//Compare function code
			case 'function':
				if (typeof (obj2[p]) == 'undefined' || (p != 'compare' && obj1[p].toString() != obj2[p].toString())) return false;
				break;
			//Compare values
			default:
				if (obj1[p] != obj2[p]) return false;
		}
	}
 
	//Check object 2 for any extra properties
	for (var p in obj2) {
		if (typeof (obj1[p]) == 'undefined') return false;
	}
	return true;
};

const assetFileName = (name) => path.resolve(path.join(process.env.PWD, 'data', 'assets', `${name}.json`));

const writeAssetFile = (name, hashes) => fs.writeFileSync(assetFileName(name), JSON.stringify(hashes));

const hashAssets = (files) => {
	const hashes = {};
	files.forEach((file) => {
		hashes[file] = sha1(fs.readFileSync(file));
	})
	hashes['production'] = process.env.NODE_ENV === 'production'
	return hashes;
}

// This file returns true if the asset cache matches:
export const compareFiles = (name, files) => {
	const fileName = assetFileName(name);
	const hashes = hashAssets(files);
	
	if(!fs.existsSync(fileName)) {
		writeAssetFile(name, hashes);
		return false;
	}
	
	const cachedHashes = JSON.parse(fs.readFileSync(fileName).toString());
	const noChange = Object.compare(cachedHashes, hashes);
	
	if(!noChange) {
		writeAssetFile(name, hashes);
	} 
	
	return noChange;
}