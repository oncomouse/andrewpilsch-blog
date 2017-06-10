import autoprefixer from 'autoprefixer'
import postcssClearfix from 'postcss-clearfix'
import postcssEasings from 'postcss-easings'
import cssMqpacker from 'css-mqpacker'
import cssnano from 'cssnano'
import laggard from 'laggard'
import path from 'path'
import fs from 'fs'
import bowerPath from './utilities/bowerPath'

const inputDir = path.resolve(path.join('.', 'assets', 'stylesheets'));
const outputDir = path.resolve(path.join('.', '.tmp', 'stylesheets'));

// Export our taskSrc so the master gulpfile knows what we want it to watch for changes:
export const taskSrc =  path.join(inputDir, '**', '*.scss');

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

export default (gulp, plugins) => {
	// Add cssnano in production
	if(plugins.util.env.node_env === 'production' && !postCssPlugins.includes(cssnano)) {
		postCssPlugins.push(cssnano);
	}
	return () => gulp.src(taskSrc)
	// Compile SASS files:
	.pipe(plugins.sass({includePaths: sassIncludePaths}))
	// Run PostCSS:
	.pipe(plugins.postcss(postCssPlugins))
	// Rename our .css.scss files to .css files:
	.pipe(plugins.rename(path => path.basename = path.basename.replace(/\.css$/,'')))
	// Write to destination:
	.pipe(gulp.dest(outputDir));
}