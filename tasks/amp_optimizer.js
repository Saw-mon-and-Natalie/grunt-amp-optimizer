/*
 * grunt-amp-optimizer
 * https://github.com/Saw-mon-and-Natalie/grunt-amp-optimizer
 *
 * Copyright (c) 2020 Saw-mon and Natalie
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  const AmpOptimizer = require('@ampproject/toolbox-optimizer')

  grunt.registerMultiTask('amp_optimizer', 'A Grunt Plugin to optimize AMP HTML ⚡ at build-time.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      separator: grunt.util.linefeed + grunt.util.linefeed
    });

    const done = this.async()

    

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        const content = grunt.file.read(filepath);
        let optimizedHTML

        const ampOptimizer = AmpOptimizer.create()
        optimizedHTML = await ampOptimizer.transformHtml(content, options)
        return optimizedHTML
      }).join(grunt.util.normalizelf(options.separator));

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.verbose.writeln('File "' + chalk.cyan(f.dest) + '" created.');
      done()
    });

    grunt.log.ok(this.files.length + ' ' + grunt.util.pluralize(this.files.length, 'file/files') + ' created.');
  });

};
