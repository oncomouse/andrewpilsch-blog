import path from 'path'
import fs from 'fs'
import Mincer from 'mincer'
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

export default (gulp, plugins) => {
	return () => gulp.src(path.join(inputDir, '**', '*.js'))
	.pipe(plugins.mincer(mincerEnvironment))
	.pipe(plugins.util.env.node_env === 'production' ? plugins.uglify() : plugins.util.noop())
	.pipe(gulp.dest(outputDir));
}