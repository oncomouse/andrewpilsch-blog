import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import path from 'path'

import gulpjs from './tasks/js'
import gulpsass from './tasks/sass'

// Load all the Gulp plugins in package.json:
const plugins = gulpLoadPlugins();

// Rewrite gulp.src to catch errors:
const gulp_src = gulp.src;
gulp.src = function() {
	return gulp_src.apply(gulp, arguments)
	.pipe(plugins.plumber(function(err) {
	    plugins.util.log(plugins.util.colors.red('Error (' + error.plugin + '): ' + error.message));
        // emit the end event, to properly end the task
        this.emit('end');
	}))
}

// Load up our two imported tasks:
gulp.task('js', gulpjs(gulp, plugins));
gulp.task('sass', gulpsass(gulp, plugins));

// Default task:
gulp.task('default', ['js', 'sass'], () => {
	// If not in production, load watchers:
	if(plugins.util.env.node_env !== 'production') {
		gulp.watch(path.resolve(path.join('.', 'assets', 'javascripts', '**', '*.js')), ['js']);
		gulp.watch(path.resolve(path.join('.', 'assets', 'stylesheets', '**', '*.scss')), ['sass']);
	}
});