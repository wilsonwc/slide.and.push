var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var less = require('gulp-less');

gulp.task('lint', function(){
    return gulp.src('js/*.js')
        .pipe(jshint())
	    .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(rename(function(path){
            path.basename += ".min";
	    }))
        .pipe(uglify())
	    .pipe(gulp.dest('dist'));
});

gulp.task('less', function(){
    return gulp.src('less/slide.and.push.less')
        .pipe(less())
	    .pipe(gulp.dest('dist/css'));
});

gulp.task('default', ['lint', 'less', 'scripts']);
