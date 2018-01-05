const gulp 					= require('gulp');
const sass 					= require('gulp-sass');
const browserSync 	= require('browser-sync').create();
const autoprefixer	= require('gulp-autoprefixer');
const sourcemaps 		= require('gulp-sourcemaps');
const plumber 			= require('gulp-plumber');
const mmq 					= require('gulp-merge-media-queries');
const notify 				= require('gulp-notify');
const cssmin				= require('gulp-cssmin');
const concat        = require('gulp-concat');
const pug           = require('gulp-pug');
const webpack       = require('webpack-stream');
const imgmin        = require('gulp-imagemin');
const del           = require('del');



gulp.task('browser-sync', () =>{
	browserSync.init({
		server: {
			baseDir: 'htdocs'
		}
		//proxy: "http://localhost/"
	});
});

gulp.task("browser-reload", () =>{
  browserSync.reload();
});

gulp.task('imgmin', () =>{
  gulp.src('src/common/img/**/*')
  .pipe(imgmin({
    interlaced: true,
    progressive: true,
    optimizationLevel: 5,
    svgoPlugins: [{
      removeViewBox: true
    }]
  }))
  .pipe(gulp.dest('htdocs/common/img'))
})

gulp.task('clean', function () {
  del(['htdocs/common/img']);
});

gulp.task('pug', () =>{
  gulp.src('src/**/!(_)*.pug')
  .pipe(plumber({
    errorHandler: notify.onError('Error: <%= error.message %>')
  }))
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('htdocs'))
  .pipe(browserSync.stream());
})

gulp.task('sass', () =>{
	gulp.src('src/common/scss/**/*.scss')
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
  .pipe(cssmin())
	.pipe(sourcemaps.write('map'))
	.pipe(gulp.dest('htdocs/common/css'))
	.pipe(browserSync.stream());
});

gulp.task('js', () =>{
  gulp.src('src/common/js/**/!(_)*.js')
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
    },

  }))
  .pipe(gulp.dest('htdocs/common/js/'))
  .pipe(browserSync.stream());
});


gulp.task('watch', () =>{
	gulp.watch('src/common/scss/**/*.scss',['sass']);
  gulp.watch('src/**/*.pug',['pug']);
	gulp.watch('src/common/js/**/*.js',['js']);
  gulp.watch('src/common/img/**/*',['clean','imgmin']);
	gulp.watch(
		[
  		'htdocs/**/*.html',
			'htdocs/**/*.php'
		],
		['browser-reload']);
});


gulp.task('default', ['browser-sync','watch']);
