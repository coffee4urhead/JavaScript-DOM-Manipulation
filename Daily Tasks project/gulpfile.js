const { src, dest, watch, series} = require('gulp')
const sass = require('gulp-sass')(require('sass'))

function transpileStyles() {
    return src('*.scss')
    .pipe(sass())
    .pipe(dest('cssTranspiledStyles'))
}

function watchTask() {
    watch(['*.scss'], transpileStyles())
}

exports.default = series(transpileStyles, watchTask)