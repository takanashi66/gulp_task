var gulp = require('gulp');
var browserSync =require('browser-sync');
var plumber = require('gulp-plumber');
var pleeease = require('gulp-pleeease');
var sass = require('gulp-sass');
var notify = require('gulp-notify');

gulp.task('default', ['browser-sync']);

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: "../" //監視するディレクトリ
			,index  : "index.html"
		}
	});
});

gulp.task('css', function () {
  gulp.src('sass/*.scss')
  	.pipe(plumber({
			errorHandler: notify.onError("Error: <%= error.message %>")
		}))
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(pleeease({
		  mqpacker: true,
		  minifier: false,
			autoprefixer: true
		}))
    .pipe(gulp.dest('../common/css'))
    .pipe(browserSync.stream())
    .pipe(notify('Sass compiled!'));
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('watch', function(){
	gulp.watch(' sass/*.scss', function(event) {
		gulp.run('css');
	});
});
 
gulp.task('default', function() {
  gulp.watch("sass/*.scss",["css"]);
});

gulp.task('default', ['browser-sync'], function () {
	gulp.watch("sass/*.scss",           ['css']);
  gulp.watch("../*.html",             ['bs-reload']);
  gulp.watch("../*.php",              ['bs-reload']);
  gulp.watch("../**/*.html",          ['bs-reload']);
  gulp.watch("../**/*.php",           ['bs-reload']);
  //gulp.watch("sass/*.scss",           ['bs-reload']);
  gulp.watch("../common/css/*.css",   ['bs-reload']);
  gulp.watch("../common/js/*.js",     ['bs-reload']);
});