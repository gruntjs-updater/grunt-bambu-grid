/*
 * grunt-bambu-grid
 * https://github.com/netbek/grunt-bambu-grid
 *
 * Copyright (c) 2015 Hein Bekker
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},
		clean: {
			tests: ['tmp', 'test/css/grid.css']
		},
		bambu_grid: {
			tests: {
				options: {
					columns: 12,
					gutter: 2,
					unit: 'em',
					decimals: 5,
					rowClass: 'row',
					columnClass: 'col',
					mediaQueries: {
						xs: 'screen and (min-width: 0em)', // 0px
						sm: 'screen and (min-width: 40em)', // 640px
						md: 'screen and (min-width: 62em)', // 992px
//						lg: 'screen and (min-width: 90em)', // 1440px
//						xl: 'screen and (min-width: 120em)' // 1920px
					}
				},
				dest: 'test/css/grid.css'
			}
		},
		nodeunit: {
			tests: ['test/*_test.js']
		}
	});

	grunt.loadTasks('tasks');

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

//	grunt.registerTask('test', ['clean', 'bambu_grid', 'nodeunit']);
	grunt.registerTask('test', ['clean', 'bambu_grid']);

	grunt.registerTask('default', ['jshint', 'bambu_grid']);

};
