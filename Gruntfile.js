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
    a11y: {
      dev: {
        options: {
          urls: ['build/**/*.html'],
          failOnError: false, // @todo: set this to true when we are ready for MAXAUDIT
        }
      }
    },

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
          branch: '<%= pkg.config.branch %>',
          tag: 'v' + '<%= pkg.version %>'
        }
      }
    },

    // Grunt bump
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json', 'bower.json'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false,
        prereleaseName: 'beta',
        metadata: '',
        regExp: false
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

  // Register tasks
  grunt.registerTask('build', ['exec:build']);
  grunt.registerTask('deploy', ['uglify:deploy', 'cssmin:deploy', 'buildcontrol:deploy']);
  grunt.registerTask('default', ['htmllint', 'sasslint', 'build', 'browserSync', 'penthouse', 'watch']);
  grunt.registerTask('release', ['test', 'bump:' + type]);
  grunt.registerTask('test', ['htmllint', 'sasslint', 'build'/*,'a11y'*/]);

};
