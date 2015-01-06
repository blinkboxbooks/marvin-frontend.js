'use strict';

// All JS source files we want to check.
var allSources = ['Gruntfile.js', 'karma.conf.js', 'e2e-tests/**/*.js', 'app/**/*.js'];

module.exports = function(grunt){
  // Use Just In Time Grunt to prevent loading all modules via grunt.loadNpmTask(*) on every run.
  require('jit-grunt')(grunt, {
    protractor: 'grunt-protractor-runner'
  });

  grunt.initConfig({
    // Run Karma to run Jasmine unit test.
    karma: {
      options: {
        configFile: 'karma.conf.js',
        singleRun: true
      },
      unit: {}
    },

    // Run Protractor end to end tests.
    protractor: {
      options: {
        configFile: 'e2e-tests/protractor.conf.js'
      },
      all: {}
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
    },

    // Simple web server in order to run test.
    connect: {
      options: {
        port: 8000,
        hostname: 'localhost',
        protocol: 'https',
        base: './'
      },
      server: {},

      // Run local development version.
      serve: {
        options: {
          keepalive: true
        }
      }
    }
  });

  // Run all tests.
  grunt.registerTask('test', ['lintspaces', 'jshint', 'connect:server', 'karma:unit', 'protractor']);

  // Test and build application.
  grunt.registerTask('build', ['test']);

  // Default task.
  grunt.registerTask('default', ['build']);
};