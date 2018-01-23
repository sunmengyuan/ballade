const gulp = require('gulp')
const rename = require('gulp-rename')
const replace = require('gulp-replace-task')
const rev = require('gulp-rev')
const inline = require('gulp-inline-source')
const zip = require('gulp-zip')
const del = require('del')
const settings = require('./settings')
const routes = require('./src/routes')

gulp.task('entries', () => {
    var flag = true
    for (let key in routes) {
        gulp.src(`./entry/entries/${routes[key].view}.js`)
            .on('data', () => {
                flag = false
            })
            .on('end', () => {
                if (flag) {
                    console.log('new entry: ', `/entries/${routes[key].view}.js`)
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
                flag = true
            })
    }
})

gulp.task('stamps', () => {
    var count = 1
    var length = Object.keys(routes).length
    var uris = []
    gulp.src('../dist/**/*.html')
        .pipe(rev())
        .pipe(gulp.dest('../dist/'))
        .on('end', () => {
            for (let key in routes) {
                let view = routes[key].view
                let path = routes[key].path
                gulp.src(`../dist/${path}${view}-*.html`)
                    .on('data', (file) => {
                        var stamp = file.path
                            .split(`${settings.project}/dist/`)[1]
                            .split('-')[1]
                            .split('.html')[0]
                        console.log(`${count}: `, `/dist/${path}${view}-${stamp}.html`)
                        uris.push({
                            "remote_file": `${settings.cdn}/dist/${path}${view}-${stamp}.html`,
                            "uri": `${settings.server}${key}[/]?.*`
                        })
                        if (count >= length) {
                            var timestamp = (new Date()).toString()
                            gulp.src('./temp.json')
                                .pipe(replace({
                                    patterns: [
                                        {
                                            match: /<%=Holder%>/g,
                                            replacement: `{"items":${JSON.stringify(uris)},"deploy_time":"${timestamp}"}`
                                        }
                                    ]
                                }))
                                .pipe(rename('routes.json'))
                                .pipe(gulp.dest('../dist/'))
                        }
                        count++
                    })
            }
        })
})

gulp.task('inline', () => {
    gulp.src('../dist/**/*-*.html')
        .pipe(inline())
        .pipe(gulp.dest('../dist/'))
})

gulp.task('delete', () => {
    del(['../dist/*'], {force: true})
})

gulp.task('clear', () => {
    del([
        '../dist/static',
        '../dist/**/*.html',
        '!../dist/**/*-*.html'
    ], {force: true})
})

gulp.task('zip', () => {
    gulp.src('../dist/**/*')
        .pipe(zip('dist.zip'))
        .pipe(gulp.dest('../'))
})
