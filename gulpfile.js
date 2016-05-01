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


gulp.task('compass', function() {
  gulp.src('../*.scss')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(compass({
      config_file: 'config.rb',
      css: '../css',
      sass: '../sass',
    }))
    .pipe(gulp.dest('../css'));
});


//ブラウザリロード
gulp.task('bs-reload', function () {
    browserSync.reload();
});


gulp.task('watch', function(){
    gulp.watch('../sass/*.scss', function(event) {
        gulp.run('compass');
    });
});



//監視するファイル
gulp.task('default', ['browser-sync'], function () {
    gulp.watch("../*.html",            ['bs-reload']);
    gulp.watch("../*.php",            ['bs-reload']);
    gulp.watch("../css/*.css", ['bs-reload']);
    gulp.watch("../sass/*.scss", ['bs-reload']);
    gulp.watch("../js/*.js",   ['bs-reload']);
    gulp.watch('../sass/**/*.scss', ['compass']);
});
