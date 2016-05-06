module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },

    watch: {
      scripts: {
        files: ['src/js/<%= pkg.name %>.js', 'src/js/refactor.js'],
        tasks: ['jshint', 'uglify'],
        options: {
          spawn: false
        }
      }
    },
    uglify: {
      options: {
        banner: '/*!\n' +
            ' * Squarespace Maps plugin v<%= pkg.version %> (<%= pkg.repository.url %>)\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %>, <%= pkg.author %>, for Gaspard+Bruno (http://gaspardbruno.com/)\n' +
            ' * Portfolio at <%= pkg.homepage %>\n' +
            ' * Licensed under the <%= pkg.license %> license\n' +
            ' */\n'
      },
      build: {
        src: 'src/js/<%= pkg.name %>.js',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Check for JS code quality
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Whatch for file changes and run default tasks
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'jshint']);

};
