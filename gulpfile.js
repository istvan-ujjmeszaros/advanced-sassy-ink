'use strict';

var gulp      = require('gulp'),
    sass      = require('gulp-sass'),
    juice = require('gulp-juice-concat');

var config = {
  sourceDir: '/templates-src',
  destDir: '/templates-dist'
};

gulp.task('sass', function() {
  return gulp.src('./scss/ink.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('./css'));
});

gulp.task('inlinestyles', function() {
  gulp.src(['./template-src/**/*.html'])
    .pipe(juice({
      preserveMediaQueries: true,
      preserveFontFaces: true,
      applyWidthAttributes: true,
      applyHeightAttributes: true,
      preserveImportant: true
    }))
    .pipe(gulp.dest('./template-dist'));
});
