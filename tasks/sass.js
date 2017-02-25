import fs from 'fs'
import mkdirp from 'mkdirp'
import path from 'path'
import glob from 'glob'
import watch from 'watch'
import rimraf from 'rimraf'
import bowerPath from './utilities/bowerPath'
import sass from 'node-sass'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import postcssClearfix from 'postcss-clearfix'
import postcssEasings from 'postcss-easings'
import cssMqpacker from 'css-mqpacker'
import cssnano from 'cssnano'

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
			})
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

const compileSass = (files=[]) => {
	const sourceFiles = files.length === 0 ? glob.sync(`${baseSourcePath}/**/*.css.scss`) : files;
	
	if(files.length === 0) {
		rimraf.sync(`${destinationDir}/*`);
	}
	
	sourceFiles.forEach((file) => {
		const outputFile = file.replace(baseSourcePath, destinationDir).replace(/\.css\.scss$/, '.css');
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

if (process.env.NODE_ENV === 'production') {
	compileSass();
} else {
	compileSass()
	watch.createMonitor(baseSourcePath, (monitor) => {
		monitor.on('created', (f,stat) => compileSass([f]));
		monitor.on('changed', (f,stat) => compileSass([f]));
	})
}