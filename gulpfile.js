var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var sass = require("gulp-sass");

//Complie Sass & Inject into browser
gulp.task("sass", function() {
  return gulp.src(["node_modules/bootstrap/scss/bootstrap.scss", "public/scss/*.scss"])
  .pipe(sass())
  .pipe(gulp.dest("public/css"))
  .pipe(browserSync.stream());
});

//Move JS files to Public folder
gulp.task("js", function() {
  return gulp.src(["node_modules/bootstrap/dist/js/bootstrap.min.js", "node_modules/jquery/dist/jquery.min.js", "node_modules/popper.js/dist/umd/popper.min.js"])
  .pipe(gulp.dest("public/js"))
  .pipe(browserSync.stream());
});

gulp.task("default", ["sass", "js"]);