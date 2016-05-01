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
             baseDir: "../html/" //監視するディレクトリ
            ,index  : "index.html"
        }
    });
});


gulp.task('compass', function() {
  gulp.src('sass/**/*.scss')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(compass({
      css: '../html/common/css',
      sass: 'sass',
    }))
    .pipe(gulp.dest('../css'));
});


//ブラウザリロード
gulp.task('bs-reload', function () {
    browserSync.reload();
});


gulp.task('watch', function(){
    gulp.watch('sass/**/*.scss', function(event) {
        gulp.run('compass');
    });
});



//監視するファイル
gulp.task('default', ['browser-sync'], function () {
    gulp.watch("../html/*.html",            ['bs-reload']);
    gulp.watch("../html/*.php",            ['bs-reload']);
    gulp.watch("../html/common/css/*.css", ['bs-reload']);
    gulp.watch("sass/*.scss", ['bs-reload']);
    gulp.watch("../html/common/js/*.js",   ['bs-reload']);
    gulp.watch('sass/*.scss', ['compass']);
});
