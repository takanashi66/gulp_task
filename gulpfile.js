var rootpath			= 'htdocs/';
var cmnpath				= rootpath + 'common/';

var gulp 					= require('gulp');
var sass 					= require('gulp-sass');
var browserSync 	= require('browser-sync').create();
var autoprefixer	= require('gulp-autoprefixer');
var sourcemaps 		= require('gulp-sourcemaps');
var plumber 			= require('gulp-plumber');
var mmq 					= require('gulp-merge-media-queries');
var cssmin 				= require('gulp-minify-css');
var notify 				= require('gulp-notify');
var uglify				= require('gulp-uglify');
var reload				= browserSync.reload


gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: rootpath
		}
		//proxy: "http://localhost/codecode/"
	});
});


gulp.task('browser-reload', function() {
	browserSync.reload();
});


gulp.task('sass', function(){
	gulp.src(cmnpath + 'sass/*.scss')
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
	.pipe(gulp.dest(cmnpath + 'css'));
});




gulp.task('cssmin', function() {
	gulp.src(cmnpath + 'css/*')
	.pipe(cssmin())
	.pipe(gulp.dest(cmnpath + 'min/css/'));
});

gulp.task('jsmin', function() {
 gulp.src(cmnpath + 'js/*')
 .pipe(uglify())
 .pipe(gulp.dest(cmnpath + 'min/js/'));
});



gulp.task('watch', function(){
	gulp.watch(cmnpath + 'sass/**/*.scss',['sass']);
	gulp.watch(
		[
			rootpath	+	'**/*.html',
			rootpath	+	'**/*.php',
			cmnpath		+ 'js/*.js',
			cmnpath		+ 'css/*.css'
		]).on('change', reload);
});


gulp.task('default', ['browser-sync','watch']);
gulp.task('deploy',  ['cssmin','jsmin']);
