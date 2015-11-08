'use strict';

var gulp        = require('gulp'),
    runSequence = require('run-sequence'),
    sass        = require('gulp-sass'),
    sourcemaps  = require('gulp-sourcemaps'),
    juice       = require('gulp-juice-concat'),
    replace     = require('gulp-replace');

gulp.task('sass', function() {
  return gulp.src('./scss/ink.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'nested'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css'));
});

gulp.task('custom-sass', function() {
  return gulp.src('./scss/ink-custom.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'nested'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css'));
});

gulp.task('inline-styles', function() {
  gulp.src(['./templates-src/**/*.html'])
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
    .pipe(gulp.dest('./templates-dist'));
});

gulp.task('default', function(cb) {
  runSequence('sass', 'inline-styles', cb);
});
