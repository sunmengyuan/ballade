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
                        match: /.\/routes/g,
                        replacement: '../routes'
                    },
                    {
                        match: /.\/views/g,
                        replacement: '../views'
                    }
                ]
            }))
            .pipe(rename(`entries/${routes[key].name}.js`))
            .pipe(gulp.dest('./src'))
    }
})
