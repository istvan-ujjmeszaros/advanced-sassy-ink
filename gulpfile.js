'use strict';

var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    juice = require('gulp-juice-concat'),
    replace = require('gulp-replace');

gulp.task('sass', function () {
    return gulp.src('./email-assets/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'nested'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./email-assets/css'));
});

gulp.task('inline-styles', function () {
    return gulp.src(['./emails-src/**/*.html', './emails-src/**/*.ctp'])
        .pipe(replace(']>', ']inlinerfix-->'))
        .pipe(replace('<!---noinline -->', '<!---noinline>'))
        .pipe(juice({
            preserveMediaQueries: true,
            preserveFontFaces: true,
            applyWidthAttributes: true,
            applyHeightAttributes: true,
            preserveImportant: true,
            removeStyleTags: true  // disabling that can mess up outlook!
        }))
        .pipe(replace('<!---noinline>', ''))
        .pipe(replace('<!---/noinline -->', ''))
        .pipe(replace('margin:', 'Margin:'))
        .pipe(replace('margin-top:', 'Margin-top:'))
        .pipe(replace('margin-left:', 'Margin-left:'))
        .pipe(replace('margin-bottom:', 'Margin-bottom:'))
        .pipe(replace('margin-right:', 'Margin-right:'))
        .pipe(replace('float:', 'Float:'))
        .pipe(replace(']inlinerfix-->', ']>'))
        .pipe(replace(']inlinerskip>', ']>'))
        .pipe(replace('<style-noinline', '<style'))
        .pipe(replace('</style-noinline', '</style'))
        .pipe(replace('<!--style-noinline type="text/css">', '<style type="text/css">'))
        .pipe(replace('</style-->', '</style>'))
        .pipe(replace(/\/td>\s+<td/g, '/td><td'))   // removing any whitespace between </td> and <td>
        .pipe(replace(/\/th>\s+<th/g, '/th><th'))   // removing any whitespace between </th> and <th>
        //.pipe(replace(']>', ']-->'))              // enable to test mso markup
        //.pipe(replace('<![', '<!--['))            // enable to test mso markup
        .pipe(gulp.dest('./emails-dist'));
});

gulp.task('cleanup', function () {
    gulp.src(['./emails-dist/**/*.html'])
        .pipe(replace(/\/\*#[^\/]*\*\//g, ''))  // removing sourcemap comments
        .pipe(replace(/<!-- [^>]+->/g, ''))     // removing unnecessary comments, leaves those that doesn't have a space after "<--"
        .pipe(replace(/^ +<!---/gm, '<!---'))   // remove whitespace from before the special comments (<!--- -->)
        .pipe(replace('</head>', '\n\n<!-- Made with Bulletproof HTML Email Framework -->\n\n</head>'))
        .pipe(gulp.dest('./emails-dist'));
});

gulp.task('removeoutlookblocks', function () {
    gulp.src(['./emails-dist/**/*.html'])
        .pipe(replace(/<!--\[([\s\S])*?\]-->/gm, ''))   // removes any conditional comment blocks
        .pipe(gulp.dest('./emails-dist'));
});

gulp.task('removebeginningwhitespace', function () {
    gulp.src(['./emails-dist/**/*.html'])
        .pipe(replace(/^\s+/gm, '')) // removes empty lines and the whitespace from the beginning of every line
        .pipe(gulp.dest('./emails-dist'));
});

gulp.task('default', function (cb) {
    runSequence('sass', 'inline-styles', 'cleanup', cb);
});
