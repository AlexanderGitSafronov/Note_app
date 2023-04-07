const { src, dest, watch, parallel, series } = require("gulp");

const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const htmlmin = require("gulp-htmlmin");
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean')

function minifyHTML() {
  return src("app/*.html")
    .pipe(concat("index.min.html"))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("app"))
    .pipe(browserSync.stream())
}

function styles() {
  return src("app/scss/style.scss")
    .pipe(concat("style.min.css"))
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(dest("app/css"))
    .pipe(browserSync.stream())
}

function scripts() {
  return src("app/js/main.js")
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("app/js"))
    .pipe(browserSync.stream())
}

function watching() {
  watch(['app/index.html'], minifyHTML)
  watch(['app/scss/style.scss'], styles)
  watch(['app/js/main.js'], scripts)
}

function browsersync (){
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
}

function cleanDist(){
    return src('dist')
    .pipe(clean())
}

function building(){
    return src([
        'app/index.min.html',
        'app/css/style.min.css',
        'app/js/main.min.js'
    ], {base: 'app'})
    .pipe(dest('dist'))
}

exports.styles = styles;
exports.scripts = scripts;
exports.minifyHTML = minifyHTML;
exports.watching = watching;
exports.browsersync = browsersync;

exports.build = series(cleanDist,building)
exports.default = parallel(minifyHTML,styles,scripts,browsersync,watching)
