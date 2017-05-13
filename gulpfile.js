'use strict';

var $ = require('gulp-load-plugins')();
var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var envify = require('envify/custom');
var gulp = require('gulp');
var path = require('path');
var runSequence = require('run-sequence');
var source = require('vinyl-source-stream');

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
        src: path.join(srcDir, 'index.jsx'),
        dest: 'app.js',
    },
    sass: {
        srcDir: path.join(srcDir, 'styles'),
        destDir: buildDir,
        src: path.join(srcDir, 'styles', 'main.scss'),
        dest: 'main.css',
    },
};

function handleError () {
    var args = Array.prototype.slice.call(arguments);
    console.log('errors: ', args);
    this.emit('end');
}

function reload(stream) {
    if ($.connect && $.connect.reload) {
        stream.pipe($.connect.reload());
    }
}

function bundleJS() {
    var isDevelopment = process.env.NODE_ENV !== 'production';

    return browserify({
        debug: isDevelopment,
        entries: [config.js.src],
        extensions: ['.js', '.jsx'],
        transform: [babelify],
    })
    .bundle()
    .on('error', handleError)
    .pipe(source(config.js.dest))
    .pipe(buffer())
    .pipe($.if(isDevelopment, $.sourcemaps.init({ loadMaps: true })))
    .pipe($.if(!isDevelopment, $.uglify()))
    .pipe($.if(isDevelopment, $.sourcemaps.write()))
    .pipe(gulp.dest(config.js.destDir));
}

gulp.task('build', function() {
    process.env.NODE_ENV = 'production';
    runSequence(['html', 'sass'], bundleJS);
});

gulp.task('default', ['eslint', 'js', 'html', 'sass']);

gulp.task('dev', ['default', 'server'], function() {
    gulp.watch('src/**/*.{js,jsx}', ['eslint', 'js']);
    gulp.watch(config.html.src, ['html']);
    gulp.watch('src/styles/**/*.scss', ['sass']);
});

gulp.task('html', function() {
    var h = gulp.src(config.html.src).pipe(gulp.dest('./'));
    reload(h)
});

gulp.task('eslint', function() {
    return gulp.src('src/**/*.{js,jsx}')
        .pipe($.eslint())
        .pipe($.eslint.format());
        //.pipe(eslint.failAfterError());
});

gulp.task('js', function() {
    reload(bundleJS());
});

gulp.task('sass', function() {
    var isDevelopment = process.env.NODE_ENV !== 'production';
    var s = gulp.src(config.sass.src)
        .pipe($.if(isDevelopment, $.sourcemaps.init()))
        .pipe($.sass({
            errLogToConsole: true,
            includePaths: ['node_modules'],
            outputStyle: isDevelopment ? 'expanded': 'compressed',
            precision: 6,
        }).on('error', $.sass.logError))
        .pipe($.if(isDevelopment, $.sourcemaps.write()))
        .pipe(gulp.dest(config.sass.destDir));
    reload(s);
});

gulp.task('server', function() {
    $.connect.server({
        base: 'http://localhost',
        livereload: true,
        port: config.port,
        root: ['./'],
    });
});
