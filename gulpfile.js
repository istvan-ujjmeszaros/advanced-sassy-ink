'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass');

var config = {
  sourceDir: '/templates-src',
  destDir: '/templates-dist'
};

gulp.task('sass', function() {
  return gulp.src('./scss/ink.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('./css'));
});
