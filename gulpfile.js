const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sharp = require('sharp');
const fs = require('node:fs/promises');

// Compile Sass
gulp.task('sass', function () {
  return gulp
    .src([
      'node_modules/bootstrap/scss/bootstrap.scss',
      'public/scss/*.scss',
    ])
    .pipe(sass({ style: 'compressed' }))
    .pipe(gulp.dest('public/css'));
});

// Copy Lightbox CSS
gulp.task('css', function () {
  return gulp
    .src('node_modules/lightbox2/dist/css/lightbox.min.css')
    .pipe(gulp.dest('public/css'));
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
    .pipe(gulp.dest('public/js'));
});

// Generate optimized WebP copies of homepage history images.
// Original JPEG and PNG files are never modified.
gulp.task('images', async function () {
  const imageDir = 'public/img/history';
  const files = await fs.readdir(imageDir);

  for (const file of files) {
    if (!/\.(jpe?g|png)$/i.test(file)) continue;

    const source = `${imageDir}/${file}`;
    const destination = `${imageDir}/${file.replace(/\.(jpe?g|png)$/i, '.webp')}`;

    const sourceStats = await fs.stat(source);

    try {
      const destinationStats = await fs.stat(destination);

      // Skip images that haven't changed.
      if (destinationStats.mtimeMs >= sourceStats.mtimeMs) {
        continue;
      }
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }

    await sharp(source)
      .webp({ quality: 80, effort: 6 })
      .toFile(destination);

    console.log(`Optimized: ${file}`);
  }
});

gulp.task('default', gulp.series('sass', 'css', 'js', 'images'));
