/*
 * grunt-amp-optimizer
 * https://github.com/Saw-mon-and-Natalie/grunt-amp-optimizer
 *
 * Copyright (c) 2020 Saw-mon and Natalie
 * Licensed under the MIT license.
 */

'use strict';

const AmpOptimizer = require('@ampproject/toolbox-optimizer')
const chalk = require('chalk')

module.exports = function(grunt) {



  grunt.registerMultiTask('amp_optimizer', 'A Grunt Plugin to optimize AMP HTML ⚡ at build-time.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      separator: grunt.util.linefeed + grunt.util.linefeed
    });

    const done = this.async()

    let promises = []

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
      }).map(async function(filepath) {
        // Read file source.
        const content = grunt.file.read(filepath);
        let optimizedHTML

        const ampOptimizer = AmpOptimizer.create()
        optimizedHTML = await ampOptimizer.transformHtml(content, options)
        return { dest: f.dest, optimizedHTML}
      });

      promises.push(Promise.all(src))
    });

    Promise.all(promises).then( results => {
      results.forEach((r) => {
        let transformed = ''
        let optimized = []
        let d = ''
        

        r.forEach(({dest, optimizedHTML}) => {
          d = dest
          optimized.push(optimizedHTML)
        })

        transformed = optimized.join(options.separator)

        // Write the destination file.
        grunt.file.write(d, transformed);

        // Print a success message.
        grunt.verbose.writeln('File "' + chalk.cyan(d) + '" created.');
        })

      grunt.log.ok(this.files.length + ' ' + grunt.util.pluralize(this.files.length, 'file/files') + ' created.');
      done()
    })
    .catch( err => {
      grunt.log.error(err)
      done(false)
    })

    
  });

};
