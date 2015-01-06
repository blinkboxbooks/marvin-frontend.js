'use strict';

// All JS source files we want to check.
var allSources = ['Gruntfile.js', 'karma.conf.js', 'app/**/*.js'];

module.exports = function(grunt){
  // Use Just In Time Grunt to prevent loading all modules via grunt.loadNpmTask(*) on every run.
  require('jit-grunt')(grunt);

  grunt.initConfig({
    // Run Karma to run Jasmine unit test.
    karma: {
      options: {
        configFile: 'karma.conf.js',
        singleRun: true
      },
      unit: {}
    },

    // Lint all files for JS style violations.
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },

      all: allSources
    },

    // Lint for two spaces as indentation as opposed to tabs.
    lintspaces: {
      options: {
        trailingspaces: true,
        indentation: 'spaces',
        spaces: 2
      },
      all: {
        src: allSources
      }
    }
  });

  // Run all tests.
  grunt.registerTask('test', ['lintspaces', 'jshint', 'karma:unit']);

  // Test and build application.
  grunt.registerTask('build', ['test']);

  // Default task.
  grunt.registerTask('default', ['build']);
};