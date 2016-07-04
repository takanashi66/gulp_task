var gulp = require('gulp');
var browserSync =require('browser-sync');
var compass = require('gulp-compass');
var plumber = require('gulp-plumber');
var pleeease = require('gulp-pleeease');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

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

//compass
gulp.task('compass', function () {
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
});

//pleeease
gulp.task('pleeease', function () {
	gulp.src('css/*.css')
	.pipe(pleeease({
	  mqpacker: true,
	  minifier: true,
		autoprefixer: false
	}))
	.pipe(rename({
  	extname: '.min.css'
  }))
	.pipe(gulp.dest('../common/css'));
});

//uglify
gulp.task('uglify', function() {
  return gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('../common/js'));
});


gulp.task('watch', function(){
  gulp.watch('css/*.css', function(event) {
      gulp.run('pleeease');
  });
  
  gulp.watch('js/*.js', function(event) {
      gulp.run('uglify');
  });
  
  gulp.watch('sass/*.scss', function(event) {
      gulp.run('compass');
  });
});

//ブラウザリロード
gulp.task('bs-reload', function () {
    browserSync.reload();
});



//監視するファイル
gulp.task('default', ['browser-sync'], function () {
    gulp.watch("../*.html",             ['bs-reload']);
    gulp.watch("../*.php",              ['bs-reload']);
    gulp.watch("../**/*.html",          ['bs-reload']);
    gulp.watch("../**/*.php",           ['bs-reload']);
    gulp.watch("../common/css/*.css",   ['bs-reload']);
    gulp.watch("sass/*.scss",           ['bs-reload']);
    gulp.watch("../common/js/*.js",     ['bs-reload']);
    gulp.watch('sass/*.scss',           ['compass']);
    gulp.watch('css/*.css',           	['pleeease']);
    gulp.watch('js/*.js',         	  	['uglify']);
});
