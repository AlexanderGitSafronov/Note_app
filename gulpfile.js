const { src, dest } = require("gulp");
const gulp = require("gulp");

const uglify = require("gulp-uglify-es").default;
const htmlmin = require("gulp-htmlmin");
const browserSync = require("browser-sync").create();
const csso = require("gulp-csso");
const postcss = require("gulp-postcss");
const tailwindcss = require("tailwindcss");
const rename = require("gulp-rename");
const del = require("del");

function minifyHTML() {
  return src("src/index.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("dist"))
    .pipe(browserSync.reload({ stream: true }));
}

function tailwind() {
  return src("./src/css/style.css")
    .pipe(
      postcss([
        tailwindcss("./tailwind.config.js")
      ])
    )
    .pipe(csso())
    .pipe(
      rename({
        suffix: ".min",
        extname: ".css",
      })
    )
    .pipe(dest("./dist/css"))
    .pipe(browserSync.reload({ stream: true }));
}

function scripts() {
  return src("src/js/main.js")
    .pipe(uglify())
    .pipe(
      rename({
        suffix: ".min",
        extname: ".js",
      })
    )
    .pipe(dest("dist/js"))
    .pipe(browserSync.reload({ stream: true }));
}

function watchFile() {
  gulp.watch(["src/index.html"], minifyHTML);
  gulp.watch(["src/css/style.css","src/index.html"], tailwind);
  gulp.watch(["src/js/main.js"], scripts);
}

function serve() {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
  });
}

function clean() {
  return del("dist");
}

const build = gulp.series(clean, gulp.parallel(minifyHTML, tailwind, scripts));
const watch = gulp.parallel(build, watchFile, serve);

exports.minifyHTML = minifyHTML;
exports.tailwind = tailwind;
exports.scripts = scripts;
exports.clean = clean;
exports.serve = serve;

exports.build = build;
exports.watch = watch;
exports.default = watch;
