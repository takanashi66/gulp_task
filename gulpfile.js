var gulp = require('gulp');
var browserSync =require('browser-sync');
var compass = require('gulp-compass');
var plumber = require('gulp-plumber');

gulp.task('default', ['browser-sync']);

//通常
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: "../" //監視するディレクトリ
			,index  : "index.html"
		}
	});
});


gulp.task('compass', function() {
	gulp.src('*.scss')
	.pipe(plumber({
		errorHandler: function (error) {
		console.log(error.message);
		this.emit('end');
	}}))
	.pipe(compass({
		css: '../common/css',
		sass: '../common/sass',
	}))
});


//ブラウザリロード
gulp.task('bs-reload', function () {
	browserSync.reload();
});


gulp.task('watch', function(){
	gulp.watch('*.scss', function(event) {
		gulp.run('compass');
	});
});



//監視するファイル
gulp.task('default', ['browser-sync'], function () {
	gulp.watch("../*.html",									['bs-reload']);
	gulp.watch("../**/*.html",							['bs-reload']);
	gulp.watch("../**/*.php",								['bs-reload']);
	gulp.watch("../*.php",									['bs-reload']);
	gulp.watch("../common/css/*.css",				['bs-reload']);
	gulp.watch("../common/sass/*.scss",			['bs-reload']);
	gulp.watch("../common/js/*.js",					['bs-reload']);
	gulp.watch('../common/sass/**/*.scss',	['compass']);
});
