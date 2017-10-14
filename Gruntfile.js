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
          'build/js/scripts.min.js': ['build/js/scripts.js']
        }
      }
    },

    replace: {
      dist: {
        options: {
          patterns: [
            {
              match: '<html',
              replacement: '<html amp'
            },
            {
              match: '<style',
              replacement: '<style amp-custom'
            }
          ],
          usePrefix: false
        },
        files: [
          {expand: true, flatten: true, src: ['build/*.html'], dest: 'build/'},
          {expand: true, flatten: true, src: ['build/about/*.html'], dest: 'build/about/'},
          {expand: true, flatten: true, src: ['build/blog/*.html'], dest: 'build/blog/'},
          {expand: true, flatten: true, src: ['build/careers/*.html'], dest: 'build/careers/'},
          {expand: true, flatten: true, src: ['build/case-studies/*.html'], dest: 'build/case-studies/'},
          {expand: true, flatten: true, src: ['build/contact/*.html'], dest: 'build/contact/'},
          {expand: true, flatten: true, src: ['build/contact-thanks/*.html'], dest: 'build/contact-thanks/'},
          {expand: true, flatten: true, src: ['build/cvt-enrollment/*.html'], dest: 'build/cvt-enrollment/'},
          {expand: true, flatten: true, src: ['build/services/*.html'], dest: 'build/services/'},
          {expand: true, flatten: true, src: ['build/staff/*.html'], dest: 'build/staff/'},
          {expand: true, flatten: true, src: ['build/work/*.html'], dest: 'build/work/'}
        ]
      }
    },

    // Watch files and run tasks when changed
    watch: {
      all: {
        files: [
          'src/**/*',
          'assets/**/*',
          'templates/**/*'
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
  grunt.registerTask('build', ['exec:build', 'uglify', 'replace']);
  grunt.registerTask('default', ['build', 'watch']);
  grunt.registerTask('test', ['htmllint', 'sasslint', 'build']);

};
