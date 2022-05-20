//list dependencies
const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const prefix = require("gulp-autoprefixer");
const minify = require("gulp-clean-css");
const terser = require("gulp-terser");
const imagemin = require("gulp-imagemin");
const imagewebp = require("gulp-webp");

//create functions
//scss
function compileSass() {
  return src("src/scss/*.scss")
    .pipe(sass())
    .pipe(prefix("last 2 versions"))
    .pipe(minify())
    .pipe(dest("dist/css"));
}

//js
function minifyJs() {
  return src("src/js/*.js").pipe(terser()).pipe(dest("dist/js"));
}

//images
function minifyImages() {
  return src("src/images/*.{jpg,png}")
    .pipe(
      imagemin([
        imagemin.mozjpeg({ quality: 80, progressive: true }),
        imagemin.optipng({ optimizationLevel: 2 }),
      ])
    )
    .pipe(dest("dist/images"));
}

//webp images
function minifyWebp() {
  return src("dist/images/*.{jpg,png}")
    .pipe(imagewebp())
    .pipe(dest("dist/images"));
}

//create watch task
function watchTask() {
  watch("src/scss/*.scss", compileSass);
  watch("src/js/*.js", minifyJs);
  watch("src/images/*.{jpg,png}", minifyImages);
  watch("dist/images/*.{jpg,png}", minifyWebp);
}

//default gulp
exports.default = series(
  compileSass,
  minifyJs,
  minifyImages,
  minifyWebp,
  watchTask
);
