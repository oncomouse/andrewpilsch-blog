import fs from 'fs'
import mkdirp from 'mkdirp'
import path from 'path'
import glob from 'glob'
import rimraf from 'rimraf'
import watchWrapper from './utilities/watchWrapper'
import bowerPath from './utilities/bowerPath'
import sass from 'node-sass'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import postcssClearfix from 'postcss-clearfix'
import postcssEasings from 'postcss-easings'
import cssMqpacker from 'css-mqpacker'
import cssnano from 'cssnano'
import laggard from 'laggard'
import {compareFiles} from './utilities/hashAssets'

const environment = () => {
	let exports = {};
	exports.sourceDirName = 'stylesheets';
	exports.inputPath = path.join('.', 'assets', exports.sourceDirName);
	exports.developmentDirName = '.tmp';
	exports.buildDirName = exports.developmentDirName;
	exports.outputPath = {
		production: path.join('.', exports.buildDirName, exports.sourceDirName),
		development: path.join('.', exports.developmentDirName, exports.sourceDirName)
	}
	exports.postcssPlugins = {
		development: [
			autoprefixer,
			postcssClearfix,
			postcssEasings,
			cssMqpacker({
				sort: true
			}),
			laggard
		]
	}
	exports.postcssPlugins.production = exports.postcssPlugins.development.concat([
		cssnano
	])
	return exports;
}

const defaultSetup = environment();
const sassIncludePaths = [
	path.resolve(path.join('.', 'node_modules'))
];

// Add a Bower path, if it exists:
if(fs.existsSync(path.resolve('./bower.json'))) {
	sassIncludePaths.push(bowerPath());
}

const destinationDir = process.env.NODE_ENV === 'production' ? path.resolve(defaultSetup.outputPath.production) : path.resolve(defaultSetup.outputPath.development);
const baseSourcePath = path.resolve(defaultSetup.inputPath);

const outputPath = (file) => file.replace(baseSourcePath, destinationDir).replace(/\.css\.scss$/, '.css');

const compileSass = (files=[]) => {
	const sourceFiles = files.length === 0 ? glob.sync(`${baseSourcePath}/**/*.css.scss`) : files;
	const hashName = 'sass';
	
	if(files.length === 0) {
		rimraf.sync(`${destinationDir}/*`);
	}
	
	//let cacheFresh = true;
	//const outputFiles = sourceFiles.map(f => outputPath(f));
	//outputFiles.forEach(file => {
	//	if(!fs.existsSync(file)) {
	//		cacheFresh = false;
	//	}
	//});
	//if(!compareFiles(hashName, sourceFiles)) {
	//	cacheFresh = false;
	//}
	//if(cacheFresh) {
	//	return;
	//}
	
	sourceFiles.forEach((file) => {
		const outputFile = outputPath(file);
		mkdirp.sync(path.dirname(outputFile));
		let result = sass.render({
	        file: file,
	        outputStyle: 'expand',
			includePaths: sassIncludePaths
	    }, (err, result) => {
			postcss(
				process.env.NODE_ENV === 'production' ? defaultSetup.postcssPlugins.production : defaultSetup.postcssPlugins.development
			).process(result.css).then(result => {
				fs.writeFileSync(outputFile, result.css);
				console.log(`Compiled ${path.basename(file)}`)
			});
		});
	});
}

watchWrapper(compileSass,baseSourcePath)