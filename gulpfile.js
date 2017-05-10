'use strict';

var babelify = require('babelify');
var browserify = require('browserify');
var connect = require('gulp-connect');
var eslint = require('gulp-eslint');
var gulp = require('gulp');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var transform = require('vinyl-transform');

var buildDir = './dist/';
var srcDir = './src/';

var config = {
    port: 8080,
    url: 'http://localhost',
    html: {
        src: './index.html',
        dest: './',
    },
    js: {
        srcDir: srcDir,
        destDir: buildDir,
        src: srcDir + 'index.jsx',
        dest: 'app.js',
    },
    sass: {
        srcDir: srcDir + 'styles',
        destDir: buildDir,
        src: srcDir + 'styles' + '/main.scss',
        dest: 'main.css',
    },
};


function handleError () {
    var args = Array.prototype.slice.call(arguments);
    console.log('errors: ', args);
    this.emit('end');
}

function reload(stream) {
    if (connect && connect.reload) {
        stream.pipe(connect.reload());
    }
}

gulp.task('server', function() {
    connect.server({
        base: 'http://localhost',
        livereload: true,
        port: config.port,
        root: ['./'],
    });
});

gulp.task('html', function() {
    var h = gulp.src(config.html.src).pipe(gulp.dest('./'));
    reload(h)
});

gulp.task('js', ['eslint'], function() {
    var j = browserify(config.js.src)
        .transform(babelify)
        .bundle()
        .on('error', handleError)
        .pipe(source(config.js.dest))
        .pipe(gulp.dest(config.js.destDir));

    reload(j);
});

gulp.task('default', ['html', 'js', 'sass']);

gulp.task('eslint', function() {
    return gulp.src('src/**/*.{js,jsx}')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('sass', function() {
    var s = gulp.src(config.sass.src)
        .pipe(sass({
            errLogToConsole: true,
            includePaths: ['node_modules'],
            outputStyle: 'compressed',
            precision: 6,
        }))
        .pipe(gulp.dest(config.sass.destDir));
    reload(s);
});

gulp.task('dev', ['default', 'server'], function() {
    gulp.watch('src/**/*.{js,jsx}', ['js']);
    gulp.watch(config.html.src, ['html']);
    gulp.watch('src/styles/**/*.scss', ['sass']);
});
