const gulp = require('gulp')
const replace = require('gulp-replace-task')
const rename = require('gulp-rename')
const del = require('del')
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
            .pipe(gulp.dest('./entry'))
    }
})

gulp.task('clear', function () {
    return del(['../dist/static/js', '../dist/static/css'], {force: true})
})
