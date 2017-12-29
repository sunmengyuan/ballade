const gulp = require('gulp')
const replace = require('gulp-replace-task')
const rename = require('gulp-rename')
const del = require('del')
const through2 = require('through2');
const routes = require('./src/routes')

gulp.task('entries', function () {
    for (let key in routes) {
        gulp.src('./entry/entry.js')
            .pipe(replace({
                patterns: [
                    {
                        match: /<%=Page%>/g,
                        replacement: `../../src/views/${routes[key].path}${routes[key].view}`
                    }
                ]
            }))
            .pipe(rename(`entries/${routes[key].view}.js`))
            .pipe(gulp.dest('./entry/'))
    }
})

gulp.task('stamps', function () {
    for (let key in routes) {
        let stamp_js = '';
        let stamp_css = '';
        let view = routes[key].view;
        let path = routes[key].path;
        gulp.src(`../dist/static/${view}.*.js`)
            .pipe(through2.obj(function (chunk, enc, callback) {
                stamp_js = chunk.path.split(`${view}.`)[1].split('.js')[0];
                callback();
            }))
            .on('finish', function () {
                gulp.src(`../dist/static/${view}.*.css`)
                    .pipe(through2.obj(function (chunk, enc, callback) {
                        stamp_css = chunk.path.split(`${view}.`)[1].split('.css')[0];
                        callback();
                    }))
                    .on('finish', function () {
                        gulp.src(`../dist/${path}${view}.html`)
                            .pipe(rename(`${view}.${stamp_js}.${stamp_css}.html`))
                            .pipe(gulp.dest(`../dist/${path}`))
                        return del([`../dist/${path}${view}.html`], {force: true})
                    })
            })
    }
})

gulp.task('delete', function () {
    return del(['../dist/*'], {force: true})
})

gulp.task('clear', function () {
    gulp.src('../dist/static/vendor.*.js')
        .pipe(rename('vendor.js'))
        .pipe(gulp.dest('../dist/static/'))
    gulp.src('../dist/static/manifest.*.js')
        .pipe(rename('manifest.js'))
        .pipe(gulp.dest('../dist/static/'))
    return del(['../dist/static/*', '!../dist/static/vendor.js', '!../dist/static/manifest.js'], {force: true})
})
