import fs from 'fs'
import mkdirp from 'mkdirp'
import path from 'path'
import glob from 'glob'
import rimraf from 'rimraf'
import Mincer from 'mincer'
import UglifyJS from 'uglify-js'
import watchWrapper from './utilities/watchWrapper'
import bowerPath from './utilities/bowerPath'

const inputDir = path.resolve(path.join('.', 'assets', 'javascripts'));
const outputDir = path.resolve(path.join('.', '.tmp', 'javascripts'));

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
	if(files.length === 0) {
		rimraf.sync(`${outputDir}`);
	}
	mkdirp.sync(outputDir);
	jsFiles.forEach(file => {
		// Load the asset:
		const asset = mincerEnvironment.findAsset(file.replace(inputDir,'').replace(/^\//,''));
		// Minify the source if in production & just load it if not:
		const assetSource = (process.env.NODE_ENV === 'production') ? UglifyJS.minify(asset.toString(), {fromString: true}) : asset.toString();
		const outputFile = file.replace(inputDir, outputDir);
	
		// Write the file:
		fs.writeFileSync(outputFile, assetSource);
		console.log(`Compiled ${path.basename(file)}`);
	});
}

watchWrapper(compileJS,inputDir);