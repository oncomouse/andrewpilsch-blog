import fs from 'fs'
import mkdirp from 'mkdirp'
import path from 'path'
import glob from 'glob'
import rimraf from 'rimraf'
import Mincer from 'mincer'
import UglifyJS from 'uglify-js'
import watch from 'watch'
import bowerPath from './utilities/bowerPath'

const inputDir = path.resolve(path.join('.', 'assets', 'javascripts'));
const outputDir = path.resolve(path.join('.', '.tmp', 'javascripts'));

const mincerEnvironment = new Mincer.Environment();
mincerEnvironment.appendPath(inputDir);
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
		const asset = mincerEnvironment.findAsset(path.basename(file));
		const assetSource = (process.env.NODE_ENV === 'production') ? UglifyJS.minify(asset.toString(), {fromString: true}) : asset.toString();
		const outputFile = file.replace(inputDir, outputDir);
	
		fs.writeFileSync(outputFile, assetSource);
		console.log(`Compiled ${path.basename(file)}`);
	});
}

if (process.env.NODE_ENV === 'production') {
	compileJS();
} else {
	compileJS()
	watch.createMonitor(inputDir, (monitor) => {
		monitor.on('created', (f,stat) => compileJS([f]));
		monitor.on('changed', (f,stat) => compileJS([f]));
	})
}