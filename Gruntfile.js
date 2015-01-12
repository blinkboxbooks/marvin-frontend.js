'use strict';

var interfaces = require('os').networkInterfaces();
var info;

if (typeof(interfaces.en0) !== 'undefined'){
  info = interfaces.en0;
}
else {
  info = interfaces.eth0;
}

var networkAddress = info.filter(function(i){ return i.family === 'IPv4'; })[0].address;

console.log('Network address is ' + networkAddress);

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
      local: {},
      all: {},
      'ci-test': {
        options: {
          args: {
            seleniumAddress: 'http://192.168.17.236:4444/wd/hub',
            baseUrl: 'http://' + networkAddress + ':8000'
          }
        }
      }
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

    bootlint: {
      options: {
        stoponerror: true
      },
      files: ['**.html']
    },

    // Simple web server in order to run test.
    connect: {
      options: {
        port: 8000,
        hostname: 'localhost',
        protocol: 'http',
        base: './'
      },
      server: {},

      // Run local development version.
      serve: {
        options: {
          keepalive: true,
          port: 7000,
          open: true,
          livereload: true
        }
      }
    },

    // Run a watch that re-compiles the application and runs the tests.
    watch: {
      options: {
        livereload: true,
        spawn: true
      },
      files: allSources,
      tasks: ['ci-test']
    }
  });

  // Lint files.
  grunt.registerTask('lint', ['bootlint', 'lintspaces', 'jshint']);

  // Run all tests.
  grunt.registerTask('test', ['lint', 'connect:server', 'karma:unit', 'protractor:local']);

  // Run the CI tests - at the moment excluding the end to end tests.
  grunt.registerTask('ci-test', ['lint', 'connect:server', 'karma:unit', 'protractor:ci-test']);

  // Default task.
  grunt.registerTask('default', ['test', 'build']);
};