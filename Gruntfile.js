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

    // Run google font downloaders before metalsmith.
    googlefonts: {
      build: {
        options: {
          fontPath: 'assets/fonts/',
          cssFile: 'assets/fonts/fonts.css',
          fonts: [
            {
              family: 'Montserrat',
              styles: [
                300, 400, 500
              ]
            }
          ]
        }
      }
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

    critical: {
      dist: {
        options: {
          base: './',
          css: [
          'build/styles/final.css'
          ],
          width: 2000,
          height: 20000,
          inline: true,
          minify: true,
          include: [/(.*?)::?[^ ,:.]+(.*)/g]
        },
        // Uncomment when it is time to go live and remove the one below it.
        // src: ['build/*.html','build/**/*.html'],
        // dest: './'
        src: ['build/*.html'],
        dest: './'
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
              match: '<style type="text\/css">',
              replacement: '<style amp-custom>'
            },
            {
              match: '..\/build\/styles\/assets\/fonts',
              replacement: 'fonts'
            },
            {
              match: '@charset "UTF-8";',
              replacement: ''
            },
            {
              match: '@-ms-viewport{width:device\-width}',
              replacement: ''
            },
            {
              match: '!important',
              replacement: ''
            },
            {
              match: 'as="style" onload="this.rel=\'stylesheet\'"',
              replacement: ''
            },
            {
              match: '<noscript><link rel="stylesheet" href="styles\/final.css"><\/noscript>',
              replacement: ''
            },
            {
              match: '<link rel="preload" href="styles\/final.css" >',
              replacement: ''
            },
            {
              match: '<script>!function(e){"use strict";var t=function(t,n,r){function o(e){if(i.body)return e();setTimeout(function(){o(e)})}function a(){d.addEventListener&&d.removeEventListener("load",a),d.media=r||"all"}var l,i=e.document,d=i.createElement("link");if(n)l=n;else{var s=(i.body||i.getElementsByTagName("head")[0]).childNodes;l=s[s.length-1]}var u=i.styleSheets;d.rel="stylesheet",d.href=t,d.media="only x",o(function(){l.parentNode.insertBefore(d,n?l:l.nextSibling)});var f=function(e){for(var t=d.href,n=u.length;n--;)if(u[n].href===t)return e();setTimeout(function(){f(e)})};return d.addEventListener&&d.addEventListener("load",a),d.onloadcssdefined=f,f(a),d};"undefined"!=typeof exports?exports.loadCSS=t:e.loadCSS=t}("undefined"!=typeof global?global:this),function(e){if(e.loadCSS){var t=loadCSS.relpreload={};if(t.support=function(){try{return e.document.createElement("link").relList.supports("preload")}catch(e){return!1}},t.poly=function(){for(var t=e.document.getElementsByTagName("link"),n=0;n<t.length;n\+\+){var r=t[n];"preload"===r.rel&&"style"===r.getAttribute("as")&&(e.loadCSS(r.href,r,r.getAttribute("media")),r.rel=null)}},!t.support()){t.poly();var n=e.setInterval(t.poly,300);e.addEventListener&&e.addEventListener("load",function(){t.poly(),e.clearInterval(n)}),e.attachEvent&&e.attachEvent("onload",function(){e.clearInterval(n)})}}}(this);<\/script>',
              replacement: ''
            }
          ],
          usePrefix: false,
          preserveOrder: true,
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
  grunt.registerTask('build', ['googlefonts', 'exec:build', 'uglify', 'critical', 'replace']);
  grunt.registerTask('default', ['build', 'watch']);
  grunt.registerTask('test', ['htmllint', 'sasslint', 'build']);

};
