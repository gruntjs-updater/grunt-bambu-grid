/*
 * grunt-bambu-grid
 * https://github.com/netbek/grunt-bambu-grid
 *
 * Copyright (c) 2015 Hein Bekker
 * Licensed under the MIT license.
 */

'use strict';

var chalk = require('chalk');
var css = require('css');

module.exports = function (grunt) {

	grunt.registerMultiTask('bambu_grid', 'Grunt plugin to generate CSS grids', function () {
		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
			columns: 12,
			gutter: 1,
			unit: 'rem',
			decimals: 5,
			rowClass: 'row',
			columnClass: 'column',
			mediaQueries: {}
		});

		var rowClass = options.rowClass;
		var rowSelector = '.' + rowClass;
		var columnClass = options.columnClass;
		var columnSelector = '.' + columnClass;

		// Iterate over all specified file groups.
		this.files.forEach(function (fileGroup) {
			grunt.file.write(fileGroup.dest, build(options));
			grunt.log.writeln('File ' + chalk.cyan(fileGroup.dest) + ' created');
		});

		function build (options) {
			var rules = [];
			var columnWidth = 100 / options.columns;
			var halfGutter = options.gutter / 2;
			var mqNames = Object.keys(options.mediaQueries);

			var columnSelectors = [];
			for (var i = options.columns; i > 0; i--) {
				mqNames.forEach(function (name, index) {
					columnSelectors.push(columnSelector + '-' + name + '-' + i);
				});
			}

			// Box model.
			rules.push({
				type: 'rule',
				selectors: [
					'*',
					'*:before',
					'*:after'
				],
				declarations: [
					{
						type: 'declaration',
						property: '-webkit-box-sizing',
						value: 'border-box'
					},
					{
						type: 'declaration',
						property: '-moz-box-sizing',
						value: 'border-box'
					},
					{
						type: 'declaration',
						property: 'box-sizing',
						value: 'border-box'
					}
				]
			});

			// Default row.
			rules.push({
				type: 'rule',
				selectors: [rowSelector],
				declarations: [
					{
						type: 'declaration',
						property: 'width',
						value: '100%'
					},
					{
						type: 'declaration',
						property: 'margin',
						value: '0 auto'
					}
				]
			});

			// Row clearfix.
			rules.push({
				type: 'rule',
				selectors: [
					rowSelector + ':before',
					rowSelector + ':after'
				],
				declarations: [
					{
						type: 'declaration',
						property: 'content',
						value: '" "'
					},
					{
						type: 'declaration',
						property: 'display',
						value: 'table'
					}
				]
			});
			rules.push({
				type: 'rule',
				selectors: [rowSelector + ':after'],
				declarations: [
					{
						type: 'declaration',
						property: 'clear',
						value: 'both'
					}
				]
			});

			// Nested rows.
			rules.push({
				type: 'rule',
				selectors: [rowSelector + ' ' + rowSelector],
				declarations: [
					{
						type: 'declaration',
						property: 'width',
						value: 'auto'
					},
					{
						type: 'declaration',
						property: 'margin',
						value: '0 -' + halfGutter + options.unit
					}
				]
			});

			// Default column.
			rules.push({
				type: 'rule',
				selectors: columnSelectors,
				declarations: [
					{
						type: 'declaration',
						property: 'position',
						value: 'relative'
					},
					{
						type: 'declaration',
						property: 'padding-right',
						value: halfGutter + options.unit
					},
					{
						type: 'declaration',
						property: 'padding-left',
						value: halfGutter + options.unit
					},
					{
						type: 'declaration',
						property: 'width',
						value: '100%'
					},
					{
						type: 'declaration',
						property: 'min-height',
						value: '1px'
					}
				]
			});

//			// Incomplete rows.
//			rules.push({
//				type: 'rule',
//				selectors: [
//					'[class*="' + columnClass + '"] + [class*="' + columnClass + '"]:last-child'
//				],
//				declarations: [
//					{
//						type: 'declaration',
//						property: 'float',
//						value: 'right'
//					}
//				]
//			});
//			rules.push({
//				type: 'rule',
//				selectors: [
//					'[class*="' + columnClass + '"] + [class*="' + columnClass + '"].end'
//				],
//				declarations: [
//					{
//						type: 'declaration',
//						property: 'float',
//						value: 'left'
//					}
//				]
//			});

			mqNames.forEach(function (name, index) {
				var i, x;
				var mediaRules = [];
				var selectors = [];

				for (i = options.columns; i > 0; i--) {
					selectors.push(columnSelector + '-' + name + '-' + i);
				}

				mediaRules.push({
					type: 'rule',
					selectors: selectors,
					declarations: [
						{
							type: 'declaration',
							property: 'float',
							value: 'left'
						}
					]
				});

				for (i = options.columns; i >= 0; i--) {
					x = columnWidth * i;

					if (i > 0) {
						// Width.
						mediaRules.push({
							type: 'rule',
							selectors: [columnSelector + '-' + name + '-' + i],
							declarations: [
								{
									type: 'declaration',
									property: 'width',
									value: toFixed(x, options.decimals) + '%'
								}
							]
						});

						// Pull.
						mediaRules.push({
							type: 'rule',
							selectors: [columnSelector + '-' + name + '-pull-' + i],
							declarations: [
								{
									type: 'declaration',
									property: 'right',
									value: toFixed(x, options.decimals) + '%'
								}
							]
						});

						// Push.
						mediaRules.push({
							type: 'rule',
							selectors: [columnSelector + '-' + name + '-push-' + i],
							declarations: [
								{
									type: 'declaration',
									property: 'left',
									value: toFixed(x, options.decimals) + '%'
								}
							]
						});
					}
					else {
						// Pull.
						mediaRules.push({
							type: 'rule',
							selectors: [columnSelector + '-' + name + '-pull-' + i],
							declarations: [
								{
									type: 'declaration',
									property: 'right',
									value: 'auto'
								}
							]
						});

						// Push.
						mediaRules.push({
							type: 'rule',
							selectors: [columnSelector + '-' + name + '-push-' + i],
							declarations: [
								{
									type: 'declaration',
									property: 'left',
									value: 'auto'
								}
							]
						});
					}

					// Offset.
					mediaRules.push({
						type: 'rule',
						selectors: [columnSelector + '-' + name + '-offset-' + i],
						declarations: [
							{
								type: 'declaration',
								property: 'margin-left',
								value: toFixed(x, options.decimals) + '%'
							}
						]
					});
				}

				if (index === 0) {
					rules = rules.concat(mediaRules);
				}
				else {
					rules.push({
						type: 'media',
						media: options.mediaQueries[name],
						rules: mediaRules
					});
				}
			});

			var obj = {
				type: 'stylesheet',
				stylesheet: {
					rules: rules
				}
			};

			return css.stringify(obj);
		}

		function toFixed (num, decimals) {
			return num.toFixed(num % 1 === 0 ? 0 : decimals);
		}
	});

};
