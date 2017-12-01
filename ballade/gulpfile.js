const gulp = require('gulp')
const replace = require('gulp-replace-task')
const rename = require('gulp-rename')
const routes = require('./src/routes')

gulp.task('entries', function () {
    for (let key in routes) {
        gulp.src('./src/entry.js')
            .pipe(replace({
                patterns: [
                    {
                        match: /<%=Page%>/g,
                        replacement: `../views/${routes[key].path}${routes[key].view}`
                    }
                ]
            }))
            .pipe(rename(`entries/${routes[key].view}.js`))
            .pipe(gulp.dest('./src'))
    }
})

gulp.task('commons', function () {
    gulp.src('../dist/static/js/manifest.*.js')
        .pipe(rename('manifest.js'))
        .pipe(gulp.dest('../dist/static'))
    gulp.src('../dist/static/js/vendor.*.js')
        .pipe(rename('vendor.js'))
        .pipe(gulp.dest('../dist/static'))
})
