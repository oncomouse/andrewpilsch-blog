var gulp = require('gulp');
var concat = require('gulp-concat');
var util = require('gulp-util')

Array.prototype.remove = function(from, to) {
	var rest = this.slice(parseInt(to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};

// Generate a combo script for shared JS resources:
gulp.task('default', function() {
	var target = util.env.script || './source/javascripts/**/*.js';
	if (!(target instanceof Array)) {
		target = [ target ];
	}
	target = target.sort();
	if(target.indexOf('jquery') >= 0) {
		target.remove(target.indexOf('jquery'));
		target.unshift('jquery');
	}
	return gulp.src(
		target.map((el,i) => {return './source/javascripts/' + el + '.js';})
	)
	.pipe(concat(target.join('_') + '.js'))
	.pipe(gulp.dest(
		'./source/javascripts/'
	));
});
	

