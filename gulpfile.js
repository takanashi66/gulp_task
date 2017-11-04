var gulp 					= require('gulp');
var browserSync 	= require('browser-sync').create();
var sass 					= require('gulp-sass');
var autoprefixer	= require('gulp-autoprefixer');
var sourcemaps 		= require('gulp-sourcemaps');
var plumber 			= require('gulp-plumber');
var mmq 					= require('gulp-merge-media-queries');
var webpack       = require('webpack-stream');
var pug           = require('gulp-pug');
var notify 				= require('gulp-notify');

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: './htdocs',
      index  : 'index.html'
		}
		//proxy: 'http://localhost/'
	});
});

gulp.task('browser-reload', function() {
  browserSync.reload();
});

gulp.task('pug', function(){
  gulp.src('./htdocs/pug/**/!(_)*.pug')
  .pipe(plumber({
    errorHandler: notify.onError('Error: <%= error.message %>')
  }))
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('./htdocs'));
})

gulp.task('sass', function(){
	gulp.src('./htdocs/common/sass/*.scss')
	.pipe(sourcemaps.init())
	.pipe(plumber({
		errorHandler: notify.onError('Error: <%= error.message %>')
	}))
	.pipe(sass())
	.pipe(autoprefixer({
		browsers: [
			'last 2 versions'
		],
		cascade: false
	}))
	.pipe(mmq())
	.pipe(sourcemaps.write('../map'))
	.pipe(gulp.dest('./htdocs/common/css'))
	.pipe(browserSync.stream());
});

gulp.task('babel', function(){
  gulp.src('./htdocs/common/js/es/**/*.js')
  .pipe(plumber({
    errorHandler: notify.onError('Error: <%= error.message %>')
  }))
  .pipe(webpack({
    output: {
      filename: "script.js"
    },
    module: {
      loaders: [{ 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader", 
        query:{
          presets: ['env']
        }
      }]
    }
  }))
  .pipe(gulp.dest('./htdocs/common/js'))
});

gulp.task('watch', function(){
	gulp.watch('./htdocs/common/sass/**/*.scss',['sass']);
  gulp.watch('./htdocs/pug/**/*.pug',['pug']);
	gulp.watch('./htdocs/common/js/es/**/*.js',['babel']);
	gulp.watch(
		[
  		'./htdocs/**/*.html',
			'./htdocs/**/*.php',
			'./htdocs/common/js/*.js'
		],
		['browser-reload']);
});

gulp.task('default', ['browser-sync','watch']);
