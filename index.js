var through = require('through');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var File = gutil.File;
var path = require('path');

module.exports = function(file) {
  if (typeof file !== 'string') {
    if (typeof file.path !== 'string') {
      throw new PluginError('gulp-concat', 'Missing path in file options for gulp-concat');
    }
  }

  var fileMap = {};

  function bufferContents(file) {
    if (file.isNull()) {
      return;
    }
    if (file.isStream()) {
      return this.emit('error', new PluginError('gulp-concat', 'Streaming not supported'));
    }

    var name = path.basename(file.path).replace(path.extname(file.path), '');
    fileMap[name] = file.contents.toString();
  }

  function endStream() {

    var finishedFile = new File({
      contents: new Buffer(JSON.stringify(fileMap)),
      path: file
    });

    this.emit('data', finishedFile);
    this.emit('end');
  }

  return through(bufferContents, endStream);
};
