var through = require('through');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var File = gutil.File;
var path = require('path');

module.exports = function(file, options) {
  if (typeof options === 'undefined') {
    options = {};
  }

  options.nameParser = options.nameParser || function(name) {
    path.basename(name).replace(path.extname(name), '');
  };

  if (typeof file !== 'string') {
    if (typeof file.path !== 'string') {
      throw new PluginError('gulp-files-to-json', 'Missing path in file options for gulp-files-to-json');
    }
  }

  var fileMap = {};

  function bufferContents(file) {
    if (file.isNull()) {
      return;
    }

    if (file.isStream()) {
      return this.emit('error', new PluginError('gulp-files-to-json', 'Streaming not supported'));
    }

    var name = options.nameParser(file.path);
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
