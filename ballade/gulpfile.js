const gulp = require('gulp')
const replace = require('gulp-replace-task')
const rename = require('gulp-rename')
const rev = require('gulp-rev')
const del = require('del')
const through2 = require('through2')
const settings = require('./settings')
const routes = require('./src/routes')

gulp.task('entries', function () {
    // TODO 优化
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
    var count = 1
    var length = Object.keys(routes).length
    var uris = []
    var fileUris = function () {
        var timestamp = (new Date()).toString()
        gulp.src('./uris.json')
            .pipe(replace({
                patterns: [
                    {
                        match: /<%=Uris%>/g,
                        replacement: `{"items": ${JSON.stringify(uris)},"deploy_time": "${timestamp}"}`
                    }
                ]
            }))
            .pipe(rename('routes.json'))
            .pipe(gulp.dest('../dist/'))
    }
    gulp.src('../dist/**/*.html')
        .pipe(rev())
        .pipe(gulp.dest('../dist/'))
        .on('end', function () {
            for (let key in routes) {
                let view = routes[key].view
                let path = routes[key].path
                gulp.src(`../dist/${path}${view}-*.html`)
                    .pipe(through2.obj(function (chunk, enc, callback) {
                        var stamp = chunk.path.split('-')[1].split('.html')[0]
                        uris.push({
                            "remote_file": `${settings.downloadUrl}/dist/${path}${view}-${stamp}.html`,
                            "uri": `${settings.baseUrl}${key}[/]?.*`
                        })
                        if (count >= length) fileUris()
                        count++
                    }))
            }
        })
})

gulp.task('delete', function () {
    del(['../dist/*'], {force: true})
})

gulp.task('clear', function () {
    var copy = function (type, callback) {
        gulp.src(`../dist/static/${type}.*.js`)
            .pipe(rename(`${type}.js`))
            .pipe(gulp.dest('../dist/static/'))
            .on('end', callback)
    }
    copy('vendor', function () {
        copy('manifest', function () {
            del([
                '../dist/static/*',
                '../dist/**/*.html',
                '!../dist/static/vendor.js',
                '!../dist/static/manifest.js',
                '!../dist/**/*-*.html'
            ], {force: true})
        })
    })
})
