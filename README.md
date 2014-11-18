# `gulp-files-to-json`

*A really shitty gulp plugin to read a bunch of files and output a json file.*

**Example usage:**

```js
var filesToJson = require('gulp-files-to-json');

gulp.task('svg', function() {
  gulp.src('./svg/**/*.svg')
    .pipe(svgmin())
    .pipe(filesToJson('icons.json'))
    .pipe(gulp.dest('./src/services/'));
});
```