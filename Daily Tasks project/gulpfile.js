const { src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function transpileStyles() {
    return src('dailyTaskStyles.scss')
    .pipe(sass())
    .pipe(dest('cssTranspiledStyles'))
}

function watchTask() {
    watch(['dailyTaskStyles.scss'], transpileStyles());
}

exports.default = series(transpileStyles, watchTask);