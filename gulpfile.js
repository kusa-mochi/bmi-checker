// to run tasks, do Ctrl+Shift+B

var sourceDirName = "./src";
var outputFileName = "index.js";
var outputDirName = "./output";
var debugDirName = "./output/debug";
var releaseDirName = "./output/release";
var wrappedDirName = "./wrapped/";
var binaryDirName = "./bin/";
var gulp = require('gulp');
var path = require('path');



var del = require("del");
gulp.task('clean_all', function () {
	return del([
		path.join(outputDirName, '**/*')
	]);
});
gulp.task('clean_debug', function () {
	return del([
		path.join(debugDirName, '**/*')
	]);
});
gulp.task('clean_release', function () {
	return del([
		path.join(releaseDirName, '**/*')
	]);
});



gulp.task('copy', function () {
	// copy library js files to output folder.
	gulp.src([
		path.join(sourceDirName, 'lib/js/**/*.js')
	]).pipe(gulp.dest(path.join(debugDirName, 'js')));

	// copy library css files to output folder.
	gulp.src([
		path.join(sourceDirName, 'lib/css/**/*.css')
	]).pipe(gulp.dest(path.join(debugDirName, 'css')));
});



var pug = require('gulp-pug');
gulp.task('pug', function () {
	var option = { pretty: true }
	gulp.src([
		path.join(sourceDirName, './views/**/*.pug'),
		'!./node_modules/**',
		'!**/_*.pug'
	]).pipe(plumber())
		.pipe(pug(option))
		.pipe(gulp.dest(debugDirName));
});



var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');  // error handling
gulp.task('sass', function () {
	gulp.src([
		path.join(sourceDirName, './views/**/*.scss'),
		'!./node_modules/**'    // except files below node_modules folder
	]).pipe(plumber())
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulp.dest(path.join(debugDirName, 'css')));
});



var typescript = require('gulp-typescript');
gulp.task('ts', function () {
	gulp.src([
		path.join(sourceDirName, 'ts/**/*.ts'),
		'!./node_modules/**'    // except files below node_modules folder
	]).pipe(typescript())
		.pipe(gulp.dest(path.join(debugDirName, 'js')));
});


var open = require("gulp-open");
gulp.task("test", ["rebuild_debug"], function () {
	gulp.src("./index-debug.html").pipe(open());
});



var insert = require("gulp-insert");
var minify = require("gulp-closurecompiler");
gulp.task("release", ["rebuild_debug"], function () {
	return gulp.
		src(path.join(debugDirName, outputFileName))
		.pipe(newer(releaseDirName))
		.pipe(insert.wrap("(function() {\nvar NDEBUG=true;\n", "\n})();"))
		.pipe(gulp.dest(wrappedDirName))
		.pipe(minify({ fileName: outputFileName }))
		.pipe(gulp.dest(releaseDirName));
});



gulp.task('rebuild_debug', ['clean_debug'], function () {
	gulp.start([
		'copy',
		'pug',
		'sass',
		'ts'
		]);
});
