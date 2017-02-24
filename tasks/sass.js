import fs from 'fs'
import mkdirp from 'mkdirp'
import path from 'path'
import glob from 'glob'
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
	exports.outputPath = {
		production: `./build/${exports.sourceDirName}`,
		development: `./.tmp/${exports.sourceDirName}`
	}
	exports.inputPath = `./source/${exports.sourceDirName}`;
	exports.postcssPlugins = {
		development: [
			autoprefixer,
			postcssClearfix,
			postcssEasings,
			cssMqpacker
		]
	}
	exports.postcssPlugins.production = exports.postcssPlugins.development.concat([
		cssnano
	])
	return exports;
}

const compileSass = (options={style: 'expand', production: false}) => {
	const defaultSetup = environment();
	const sassIncludePaths = [];
	if(fs.existsSync(path.resolve('./.bowerrc'))) {
		const bowerrc = JSON.parse(fs.readFileSync(path.resolve('./.bowerrc')));
		sassIncludePaths.push(bowerrc.directory !== undefined ? bowerrc.directory : path.resolve('./bower_components'));
	}
	
	const postcssPlugins = options.production ? defaultSetup.postcssPlugins.production : defaultSetup.postcssPlugins.development;
	
	const destinationDir = options.production ? path.resolve(defaultSetup.outputPath.production) : path.resolve(defaultSetup.outputPath.development);
	const baseSourcePath = path.resolve(defaultSetup.inputPath);
	const sourceFiles = glob.sync(`${baseSourcePath}/**/*.css.scss`);
	
	sourceFiles.forEach((file) => {
		const outputFile = file.replace(baseSourcePath, destinationDir).replace(/\.css\.scss$/, '.css');
		mkdirp.sync(path.dirname(outputFile));
		let result = sass.renderSync({
	        file: file,
	        outputStyle: options.style,
			includePaths: sassIncludePaths
	    });
		postcss(postcssPlugins).process(result.css).then(result => {
			fs.writeFileSync(outputFile, result.css);
			console.log(`Compiled ${file} to ${outputFile}`)
		});
	});
}

compileSass({
	production: process.env.NODE_ENV
});