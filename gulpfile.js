"use strict";

let gulp = require('gulp');
let jshint = require('gulp-jshint');

// gulp.task('default',['jshint','test','serve']);
gulp.task('default',['jshint','serve']);

gulp.task('jshint',()=>{
	return gulp.src(['./src/*.js','./src/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
})
// .task('test',()=>{
// 	require('./test.js');
// })
.task('serve',()=>{
	require('./src/server.js');
});