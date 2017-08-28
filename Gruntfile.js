/**
 * Grunt Task Runner
 *
 * This is simply to facilitate local development. To build any files, use the
 * according Metalsmith plugin.
 */

module.exports = function(grunt) {

  // Get any options
  // type takes 'prerelease', 'patch', 'minor', 'major'
  var type = grunt.option('type') || 'patch';

  // Load all grunt plugins
  require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);

  // Create the Grunt configuration
  var config = {

    // Load data from package.json
    pkg: grunt.file.readJSON('package.json'),

    // Code compliance
    htmllint: {
      tandem: {
        options: {
          force: true,
          htmllintrc: true,
        },
        src: [
          'templates/**/*.html',
          'templates/**/**/*.html',
          '!templates/components/organisms/sf/*.html' // @todo: remove SVG in here?
        ]
      }
    },
    sasslint: {
      options: {
        configFile: '.sass-lint.yml',
      },
      target: [
        'src/**/*.scss',
        'templates/**/*.scss'
      ]
    },

    // Execute Metalsmith
    exec: {
      build: {
        cmd: 'npm run build'
      },
    },

    // Production performance helpers
    uglify: {
      options: {
        compress: {
          global_defs: {
            'DEBUG': false
          },
          dead_code: true
        }
      },
      deploy: {
        files: {
          'build/js/scripts.js': ['build/js/scripts.js']
        }
      }
    },
    cssmin: {
      deploy: {
        files: [{
          expand: true,
          cwd: 'build/styles',
          src: ['main.css'],
          dest: 'build/styles',
          ext: '.css'
        }]
      }
    },

    // Watch files and run tasks when changed
    watch: {
      all: {
        files: [
          'src/**/*',
          'assets/**/*',
          'templates/**/*',
          '!src/styles/*.critical.css'
        ],
        tasks: ['build'],
        options: {
          spawn: false,
          interupt: true,
          livereload: false
        },
      },
    }

  };

  // Initialize the configuration.
  grunt.initConfig(config);

  // Register tasks
  grunt.registerTask('build', ['exec:build']);
  grunt.registerTask('default', ['build', 'watch']);
  grunt.registerTask('test', ['htmllint', 'sasslint', 'build']);

};
