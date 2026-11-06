const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));

// Compile Sass
gulp.task('sass', function () {
  return gulp
    .src([
      'node_modules/bootstrap/scss/bootstrap.scss',
      'public/scss/*.scss',
    ])
    .pipe(sass({ style: 'compressed' }))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream());
});

// Copy Lightbox CSS
gulp.task('css', function () {
  return gulp
    .src('node_modules/lightbox2/dist/css/lightbox.min.css')
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream());
});

// Copy JavaScript libraries
gulp.task('js', function () {
  return gulp
    .src([
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/popper.js/dist/umd/popper.min.js',
      'node_modules/lightbox2/dist/js/lightbox.min.js',
    ])
    .pipe(gulp.dest('public/js'))
    .pipe(browserSync.stream());
});

gulp.task('default', gulp.series('sass', 'css', 'js'));
