var gulp = require('gulp');
var browserSync =require('browser-sync');
var compass = require('gulp-compass');
var plumber = require('gulp-plumber');

gulp.task('default', ['browser-sync']);


/*
//MAMP経由用
gulp.task('browser-sync', function() {
    browserSync.init({
	    proxy: "10.0.1.4/wordpress/"
    });

});
*/

//通常
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: "../" //監視するディレクトリ
			,index  : "index.html"
		}
	});
});

//compass
gulp.task('compass', function () {
	gulp.src('scss/*.scss')
  .pipe(plumber({
    errorHandler: function (error) {
      console.log(error.message);
      this.emit('end');
  }}))
  .pipe(compass({
    css: 'css',
    sass: 'sass',
  }))
});

<<<<<<< HEAD
gulp.task('compass', function() {
  gulp.src('sass/*.scss')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(compass({
      css: 'css',
      sass: 'sass',
    }))
    .pipe(gulp.dest('../commoncss'));
=======
//pleeease
gulp.task('pleeease', function () {
	gulp.src('css/*.css')
	.pipe(pleeease({
		out: 'style.min.css',
	  mqpacker: true,
	  minifier: true,
		autoprefixer: false
	}))
	.pipe(gulp.dest('../common/css'));
>>>>>>> gulp-pleeease
});



gulp.task('watch', function(){
<<<<<<< HEAD
    gulp.watch('sass/*.scss', function(event) {
        gulp.run('compass');
    });
=======
  gulp.watch('scss/*.scss', function(event) {
      gulp.run('compass');
  });
  
  gulp.watch('css/*.css', function(event) {
      gulp.run('pleeease');
  });
>>>>>>> gulp-pleeease
});

//ブラウザリロード
gulp.task('bs-reload', function () {
    browserSync.reload();
});



//監視するファイル
gulp.task('default', ['browser-sync'], function () {
    gulp.watch("../*.html",             ['bs-reload']);
    gulp.watch("../*.php",              ['bs-reload']);
    gulp.watch("../common/css/*.css",   ['bs-reload']);
    gulp.watch("sass/*.scss",           ['bs-reload']);
    gulp.watch("../common/js/*.js",     ['bs-reload']);
    gulp.watch('sass/*.scss',           ['compass']);
    gulp.watch('css/*.css',           	['pleeease']);
});
