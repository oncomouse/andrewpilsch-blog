import path from 'path'
import fs from 'fs'
import Mincer from 'mincer'
import bowerPath from './utilities/bowerPath'

const inputDir = path.resolve(path.join('.', 'assets', 'javascripts'));
const outputDir = path.resolve(path.join('.', '.tmp', 'javascripts'));

// Export our taskSrc so the master gulpfile knows what we want it to watch for changes:
export const taskSrc =  path.join(inputDir, '**', '*.js');

// Set up Mincer:
const mincerEnvironment = new Mincer.Environment();
mincerEnvironment.appendPath(inputDir);
mincerEnvironment.appendPath(path.resolve('node_modules'));
// If we are using Bower, add the package directory:
if(fs.existsSync(path.resolve(path.join('.','bower.json')))) {
	mincerEnvironment.appendPath(bowerPath());
}

export default (gulp, plugins) => {
	return () => gulp.src(taskSrc)
	// Run Mincer:
	.pipe(plugins.mincer(mincerEnvironment))
	// If in production, run Uglify:
	.pipe(plugins.util.env.node_env === 'production' ? plugins.uglify() : plugins.util.noop())
	// Write files to destination:
	.pipe(gulp.dest(outputDir));
}