module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile %>',
				tasks: 'jshint:gruntfile'
			},

			dist: {
				files: '<%= jshint.dist %>',
				tasks: ['jshint:dist', 'mochacli:test', 'karma:test:run']
			},

			test: {
				files: '<%= jshint.test %>',
				tasks: ['jshint:test', 'mochacli:test', 'karma:test:run']
			}
		},

		mochacli: {
			test: 'test/**/*_test.js'
		},

		karma: {
			test: {
				hostname: '0.0.0.0',
				browsers: ['Firefox', 'Chrome', 'PhantomJS']
			},

			phantom: {
				singleRun: true,
				browsers: ['PhantomJS']
			},

			options: {
				reporters: 'dots',
				frameworks: ['mocha', 'browserify'],
				files: ['test/**/*_test.js'],
				browserify: { watch: true },
				preprocessors: { 'test/**/*.js': ['browserify'] }
			}
		},

		jsdoc: {
			dist: {
				src: ['lib/**/*.js', 'test/**/*_test.js'],
				options: {
					destination: 'docs'
				}
			}
		 },

		jshint: {
			gruntfile: 'Gruntfile.js',
			dist: 'lib/**/*.js',
			test: 'test/**/*.js',

			options: {
				jshintrc: '.jshintrc'
			}
		},
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-mocha-cli');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-jsdoc');

	// Default task.
	grunt.registerTask('default', ['test', 'doc']);
	grunt.registerTask('test', ['jshint', 'mochacli', 'karma:phantom']);
	grunt.registerTask('doc', ['jsdoc']);
};
