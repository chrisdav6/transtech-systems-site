var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

//Complie Sass & Inject into browser
// gulp.task('sass', function() {
//   return gulp
//     .src(['node_modules/bootstrap/scss/bootstrap.scss', 'public/scss/*.scss'])
//     .pipe(sass({ outputStyle: 'compressed' }))
//     .pipe(gulp.dest('public/css'))
//     .pipe(browserSync.stream());
// });

// //Move CSS libraries to public folder
// gulp.task('css', function() {
//   return gulp
//     .src('node_modules/lightbox2/dist/css/lightbox.min.css')
//     .pipe(gulp.dest('public/css'))
//     .pipe(browserSync.stream());
// });

// //Move JS files to Public folder
// gulp.task('js', function() {
//   return gulp
//     .src([
//       'node_modules/bootstrap/dist/js/bootstrap.min.js',
//       'node_modules/jquery/dist/jquery.min.js',
//       'node_modules/popper.js/dist/umd/popper.min.js',
//       'node_modules/lightbox2/dist/js/lightbox.min.js'
//     ])
//     .pipe(gulp.dest('public/js'))
//     .pipe(browserSync.stream());
// });

// gulp.task('default', ['sass', 'css', 'js']);

gulp.task('sass', async function(cb) {
  gulp
    .src(['node_modules/bootstrap/scss/bootstrap.scss', 'public/scss/*.scss'])
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream());
  cb();
});

//Move CSS libraries to public folder
gulp.task('css', async function(cb) {
  gulp
    .src('node_modules/lightbox2/dist/css/lightbox.min.css')
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream());
  cb();
});

//Move JS files to Public folder
gulp.task('js', async function(cb) {
  gulp
    .src([
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/popper.js/dist/umd/popper.min.js',
      'node_modules/lightbox2/dist/js/lightbox.min.js'
    ])
    .pipe(gulp.dest('public/js'))
    .pipe(browserSync.stream());
  cb();
});

gulp.task('default', gulp.series('sass', 'css', 'js'));
