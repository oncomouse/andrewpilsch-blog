import autoprefixer from 'autoprefixer'
import postcssClearfix from 'postcss-clearfix'
import postcssEasings from 'postcss-easings'
import cssMqpacker from 'css-mqpacker'
import cssnano from 'cssnano'
import laggard from 'laggard'
import path from 'path'
import fs from 'fs'
import bowerPath from './utilities/bowerPath'

export const inputDir = path.resolve(path.join('.', 'assets', 'stylesheets'));
const outputDir = path.resolve(path.join('.', '.tmp', 'stylesheets'));

const sassIncludePaths = [
	path.resolve(path.join('.', 'node_modules'))
];
// Add a Bower path, if it exists:
if(fs.existsSync(path.resolve('./bower.json'))) {
	sassIncludePaths.push(bowerPath());
}

const postCssPlugins = [
	autoprefixer,
	postcssClearfix,
	postcssEasings,
	cssMqpacker({
		sort: true
	}),
	laggard
];
if(process.env.NODE_ENV === 'production') {
	postCssPlugins.push(cssnano);
}

export default (gulp, plugins) => {
	return () => gulp.src(path.join(inputDir, '**', '*.scss'))
	.pipe(plugins.sass({includePaths: sassIncludePaths}))
	.pipe(plugins.postcss(postCssPlugins))
	.pipe(plugins.rename(path => path.basename = path.basename.replace(/\.css$/,'')))
	.pipe(gulp.dest(outputDir));
}