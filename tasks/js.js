import fs from 'fs'
import mkdirp from 'mkdirp'
import path from 'path'
import glob from 'glob'
import rimraf from 'rimraf'
import Mincer from 'mincer'
import UglifyJS from 'uglify-js'
import watchWrapper from './utilities/watchWrapper'
import bowerPath from './utilities/bowerPath'
import {compareFiles} from './utilities/hashAssets'

const inputDir = path.resolve(path.join('.', 'assets', 'javascripts'));
const outputDir = path.resolve(path.join('.', '.tmp', 'javascripts'));

const outputPath = (file) => file.replace(inputDir, outputDir);

// Set up Mincer:
const mincerEnvironment = new Mincer.Environment();
mincerEnvironment.appendPath(inputDir);
mincerEnvironment.appendPath(path.resolve('node_modules'));
// If we are using Bower, add the package directory:
if(fs.existsSync(path.resolve(path.join('.','bower.json')))) {
	mincerEnvironment.appendPath(bowerPath());
}

const compileJS = (files=[]) => {
	const jsFiles = files.length === 0 ? glob.sync(`${inputDir}/**/*.js`) : files;
	const hashName = 'js';
	if(files.length === 0) {
		rimraf.sync(`${outputDir}`);
	}
	mkdirp.sync(outputDir);
	
	// Check asset cache:
	//let cacheFresh = true;
	//const outputFiles = jsFiles.map(f => outputPath(f));	
	//outputFiles.forEach(file => {
	//	if(!fs.existsSync(file)) {
	//		console.log(`${file} does not exist.`)
	//		cacheFresh = false;
	//	}
	//});
	//if(!compareFiles(hashName, jsFiles)) {
	//	cacheFresh = false;
	//}
	//if(cacheFresh) {
	//	return;
	//}
	
	jsFiles.forEach(file => {
		// Load the asset:
		const asset = mincerEnvironment.findAsset(file.replace(inputDir,'').replace(/^\//,''));
		// Minify the source if in production & just load it if not:
		const assetSource = (process.env.NODE_ENV === 'production') ? UglifyJS.minify(asset.toString(), {fromString: true}).code : asset.toString();
		const outputFile = outputPath(file);
	
		// Write the file:
		fs.writeFileSync(outputFile, assetSource);
		console.log(`Compiled ${path.basename(file)}`);
	});
}

watchWrapper(compileJS,inputDir);