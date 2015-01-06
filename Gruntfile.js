'use strict';

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
    }
  });

  // Run all tests.
  grunt.registerTask('test', ['karma:unit']);

  // Test and build application.
  grunt.registerTask('build', ['test']);

  // Default task.
  grunt.registerTask('default', ['build']);
};