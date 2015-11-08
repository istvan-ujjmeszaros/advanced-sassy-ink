'use strict';

var gulp    = require('gulp'),
    sass    = require('gulp-sass'),
    juice   = require('gulp-juice-concat'),
    replace = require('gulp-replace');

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
    .pipe(replace('margin:', 'Margin:'))
    .pipe(replace('margin-top:', 'Margin-top:'))
    .pipe(replace('margin-left:', 'Margin-left:'))
    .pipe(replace('margin-bottom:', 'Margin-bottom:'))
    .pipe(replace('margin-right:', 'Margin-right:'))
    .pipe(replace('float:', 'Float:'))
    .pipe(gulp.dest('./template-dist'));
});
