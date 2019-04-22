"use strict";

let gulp = require('gulp');
let jshint = require('gulp-jshint');
const mocha = require('gulp-mocha');

// gulp.task('default',['jshint','test','serve']);
gulp.task('default',['jshint','test']);

gulp.task('jshint',()=>{
	return gulp.src(['./src/*.js','./src/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
})

gulp.task('test',()=>{
	return 	gulp.watch('test/**/*.spec.js', function() {
		gulp.src('test/**/*.spec.js', {read: false})
		.pipe(mocha({reporter: 'nyan'}))
	});
	
		// `gulp-mocha` needs filepaths so you can't have any plugins before it
		
});

gulp.task('serve',()=>{
	require('./src/server.js');
});