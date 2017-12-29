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
        let stamp = {}
        let view = routes[key].view
        let path = routes[key].path
        let getStamp = function (type, finish) {
            gulp.src(`../dist/static/${view}.*.${type}`)
                .pipe(through2.obj(function (chunk, enc, callback) {
                    stamp[type] = chunk.path.split(`${view}.`)[1].split(`.${type}`)[0]
                    callback()
                }))
                .on('finish', function () {
                    finish()
                })
        }
        let addStamp = function () {
            gulp.src(`../dist/${path}${view}.html`)
                .pipe(rename(`${view}.${stamp['js']}.${stamp['css']}.html`))
                .pipe(gulp.dest(`../dist/${path}`))
            return del([`../dist/${path}${view}.html`], {force: true})
        }
        getStamp('js', function () {
            getStamp('css', addStamp)
        });
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
