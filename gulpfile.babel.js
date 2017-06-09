import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import path from 'path'

import gulpjs from './tasks/js'
import gulpsass from './tasks/sass'

const plugins = gulpLoadPlugins()

const gulp_src = gulp.src;
gulp.src = function() {
	return gulp_src.apply(gulp, arguments)
	.pipe(plugins.plumber(function(err) {
	    plugins.util.log(plugins.util.colors.red('Error (' + error.plugin + '): ' + error.message));
        // emit the end event, to properly end the task
        this.emit('end');
	}))
}

gulp.task('js', gulpjs(gulp, plugins));
gulp.task('sass', gulpsass(gulp, plugins));

gulp.task('default', ['js', 'sass'], () => {
	gulp.watch(path.resolve(path.join('.', 'assets', 'javascripts', '**', '*.js')), ['js']);
	gulp.watch(path.resolve(path.join('.', 'assets', 'stylesheets', '**', '*.scss')), ['sass']);
});

gulp.task('build', ['js', 'sass']);