/**
 * Grunt Task Runner
 *
 * This is simply to facilitate local development. To build any files, use the
 * according Metalsmith plugin.
 */

module.exports = function(grunt) {
  // Create the Grunt configuration
  var config = {
    // Load data from package.json
    pkg: grunt.file.readJSON('package.json'),

    // Execute Metalsmith
    exec: {
      build: {
        cmd: 'npm run build'
      },
    },
    // BrowserSync Task
    browserSync: {
      bsFiles: {
        src: [
          "**/*.css",
          "**/*.html"
        ]
      },
      options: {
        server: {
          baseDir: "./build"
        },
        watchTask: true,
        port: 8000
      }
    },
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
    penthouse: {
      homepage: {
        outfile : 'src/styles/homepage.critical.css',
        css : './build/styles/main.css',
        url : 'http://localhost:8000',
        width : 1300,
        height : 900,
        skipErrors : false // this is the default
      },
      about: {
        outfile : 'src/styles/about.critical.css',
        css : './build/styles/main.css',
        url : 'http://localhost:8000/about',
        width : 1300,
        height : 900,
        skipErrors : false // this is the default
      },
      services: {
        outfile : 'src/styles/services.critical.css',
        css : './build/styles/main.css',
        url : 'http://localhost:8000/services',
        width : 1300,
        height : 900,
        skipErrors : false // this is the default
      },
      blog: {
        outfile : 'src/styles/blog.critical.css',
        css : './build/styles/main.css',
        url : 'http://localhost:8000/blog',
        width : 1300,
        height : 900,
        skipErrors : false // this is the default
      },
      contact: {
        outfile : 'src/styles/contact.critical.css',
        css : './build/styles/main.css',
        url : 'http://localhost:8000/contact',
        width : 1300,
        height : 900,
        skipErrors : false // this is the default
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
    },

    // The Build Control plugin:
    // https://www.npmjs.com/package/grunt-build-control
    buildcontrol: {
      options: {
        dir: 'build', // Which directory to deploy
        commit: true, // Only commit if code has changed
        push: true, // Push to remote
        message: 'Built %sourceName% from commit %sourceCommit% on branch master'
      },
      // GitHub Pages target: https://pages.github.com
      github: {
        options: {
          remote: 'git@github.com:<%= pkg.config.repo %>.git',
          branch: 'gh-pages'
        }
      },
      // The default deployment target, set in package.json.
      deploy: {
        options: {
          remote: '<%= pkg.config.deploy %>',
          branch: '<%= pkg.config.branch %>'
        }
      }
    }
  };

  // @TODO: We only want to deploy to master right now. TRAVIS_BRANCH=TRAVIS_TAG if TRAVIS_TAG exists. This is not
  // what we want
  //
  // Deploy all branches to the same branch name. Pull Requests are already handled by this.
  //if (process.env.TRAVIS_PULL_REQUEST == 'false' && process.env.TRAVIS_BRANCH) {
    // Branch switching is commented out until this is deployed.
  //  config.buildcontrol.deploy.options.branch = process.env.TRAVIS_BRANCH;
  //}

  // Extract any keys from the environmental variables.
  if (process.env.GH_TOKEN) {
    // Update the remote git repository to use the GitHub token.
    config.buildcontrol.github.options.remote = "https://" + process.env.GH_TOKEN + "@github.com/<%= pkg.config.repo %>.git";
  }

  // Initialize the configuration.
  grunt.initConfig(config);

  grunt.loadNpmTasks('grunt-build-control');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-penthouse');

  grunt.registerTask('build', ['exec:build']);
  grunt.registerTask('deploy', ['uglify:deploy', 'cssmin:deploy', 'buildcontrol:deploy']);
  grunt.registerTask('default', ['build', 'browserSync', 'penthouse', 'watch']);
};
