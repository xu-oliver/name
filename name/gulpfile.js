'use strict';
var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var connect = require('gulp-connect');

//html任务
gulp.task('html',function(){
	gulp.src('*.html')
		.pipe(gulp.dest('dist'))
		.pipe(connect.reload());
})
//server
gulp.task('webserver', function() {
    connect.server({
        livereload: true,
        port: 2333
    });
});
//刷新浏览器
gulp.task('watch',function(){
	gulp.watch('css/*.css',['css']);
	gulp.watch('js/*.js',['script']);
	gulp.watch('*.html',['html']);
})
//js-min
gulp.task('script', function() {
    // 1\. 找到文件
    gulp.src('js/*.js')
    		.pipe(gulp.dest('dist/js'))
    		.pipe(rename({suffix:'.min'}))
    // 2\. 压缩文件
        .pipe(uglify().on('error',function(e){console.log(e)}))
    // 3\. 另存压缩后的文件
        .pipe(gulp.dest('dist/js'))
})
//css-min
gulp.task('css', function() {
    // 1\. 找到文件
    gulp.src('css/*.css')
    		.pipe(gulp.dest('dist/css'))
    		.pipe(rename({suffix:'.min'}))
    // 2\. 压缩文件
        .pipe(minifycss().on('error',function(e){console.log(e)}))
    // 3\. 另存压缩后的文件
        .pipe(gulp.dest('dist/css'))
})
//合并css
gulp.task('cssConcat',function(){
	gulp.src('css/*.css')
		.pipe(concat('style.min.css'))
		.pipe(minifycss())
		.pipe(rev())
		.pipe(gulp.dest('dist/min'))
		.pipe(rec.manifest())
		.pipe(gulp.dest('rev'));
})

gulp.task('default',['webserver','watch']
//,function(){
//	gulp.start('script','css');
//}
)
