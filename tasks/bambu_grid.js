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

		var rowSelector = '.' + options.rowClass;
		var columnSelector = '.' + options.columnClass;

		// Iterate over all specified file groups.
		this.files.forEach(function (fileGroup) {
			grunt.file.write(fileGroup.dest, build(options));
			grunt.log.writeln('File ' + chalk.cyan(fileGroup.dest) + ' created');
		});

		function build (options) {
			var rules = [];
			var columnWidth = 100 / options.columns;
			var halfGutter = options.gutter / 2;

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
					},
				]
			});

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
					},
//					{
//						type: 'declaration',
//						property: 'max-width',
//						value: '64em'
//					}
				]
			});

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

			rules.push({
				type: 'rule',
				selectors: [rowSelector + '.collapse > ' + columnSelector],
				declarations: [
					{
						type: 'declaration',
						property: 'padding-left',
						value: 0
					},
					{
						type: 'declaration',
						property: 'padding-right',
						value: 0
					}
				]
			});

			rules.push({
				type: 'rule',
				selectors: [rowSelector + '.collapse ' + rowSelector],
				declarations: [
					{
						type: 'declaration',
						property: 'margin-left',
						value: 0
					},
					{
						type: 'declaration',
						property: 'margin-right',
						value: 0
					}
				]
			});

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
					},
//					{
//						type: 'declaration',
//						property: 'max-width',
//						value: 'none'
//					}
				]
			});

			rules.push({
				type: 'rule',
				selectors: [
					rowSelector + ' ' + rowSelector + ':before',
					rowSelector + ' ' + rowSelector + ':after'
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
				selectors: [
					rowSelector + ' ' + rowSelector + ':after'
				],
				declarations: [
					{
						type: 'declaration',
						property: 'clear',
						value: 'both'
					}
				]
			});

			rules.push({
				type: 'rule',
				selectors: [
					rowSelector + ' ' + rowSelector + '.collapse'
				],
				declarations: [
					{
						type: 'declaration',
						property: 'width',
						value: 'auto'
					},
					{
						type: 'declaration',
						property: 'margin',
						value: 0
					},
//					{
//						type: 'declaration',
//						property: 'max-width',
//						value: 'none'
//					}
				]
			});

			rules.push({
				type: 'rule',
				selectors: [
					rowSelector + ' ' + rowSelector + '.collapse:before',
					rowSelector + ' ' + rowSelector + '.collapse:after'
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
				selectors: [
					rowSelector + ' ' + rowSelector + '.collapse:after'
				],
				declarations: [
					{
						type: 'declaration',
						property: 'clear',
						value: 'both'
					}
				]
			});

			rules.push({
				type: 'rule',
				selectors: [
					columnSelector
				],
				declarations: [
					{
						type: 'declaration',
						property: 'padding-left',
						value: halfGutter + options.unit
					},
					{
						type: 'declaration',
						property: 'padding-right',
						value: halfGutter + options.unit
					},
					{
						type: 'declaration',
						property: 'width',
						value: '100%'
					},
					{
						type: 'declaration',
						property: 'float',
						value: 'left'
					}
				]
			});

			rules.push({
				type: 'rule',
				selectors: [
					'[class*="' + options.columnClass + '"] + [class*="' + options.columnClass + '"]:last-child'
				],
				declarations: [
					{
						type: 'declaration',
						property: 'float',
						value: 'right'
					}
				]
			});

			rules.push({
				type: 'rule',
				selectors: [
					'[class*="' + options.columnClass + '"] + [class*="' + options.columnClass + '"].end'
				],
				declarations: [
					{
						type: 'declaration',
						property: 'float',
						value: 'left'
					}
				]
			});

			Object.keys(options.mediaQueries).forEach(function (name, index) {
				var i, x;
				var mediaRules = [];

				for (i = 0; i < options.columns; i++) {
					x = columnWidth * i;

					mediaRules.push({
						type: 'rule',
						selectors: ['.' + name + '-push-' + i],
						declarations: [
							{
								type: 'declaration',
								property: 'position',
								value: 'relative'
							},
							{
								type: 'declaration',
								property: 'left',
								value: toFixed(x, options.decimals) + '%'
							},
							{
								type: 'declaration',
								property: 'right',
								value: 'auto'
							}
						]
					});

					mediaRules.push({
						type: 'rule',
						selectors: ['.' + name + '-pull-' + i],
						declarations: [
							{
								type: 'declaration',
								property: 'position',
								value: 'relative'
							},
							{
								type: 'declaration',
								property: 'right',
								value: toFixed(x, options.decimals) + '%'
							},
							{
								type: 'declaration',
								property: 'left',
								value: 'auto'
							}
						]
					});
				}

				mediaRules.push({
					type: 'rule',
					selectors: [columnSelector],
					declarations: [
						{
							type: 'declaration',
							property: 'position',
							value: 'relative'
						},
						{
							type: 'declaration',
							property: 'padding-left',
							value: halfGutter + options.unit
						},
						{
							type: 'declaration',
							property: 'padding-right',
							value: halfGutter + options.unit
						},
						{
							type: 'declaration',
							property: 'float',
							value: 'left'
						}
					]
				});

				for (i = 0; i < options.columns; i++) {
					x = columnWidth * (i + 1);

					mediaRules.push({
						type: 'rule',
						selectors: ['.' + name + '-' + (i + 1)],
						declarations: [
							{
								type: 'declaration',
								property: 'width',
								value: toFixed(x, options.decimals) + '%'
							}
						]
					});
				}

				for (i = 0; i < options.columns; i++) {
					x = columnWidth * i;

					mediaRules.push({
						type: 'rule',
						selectors: ['.' + name + '-offset-' + i],
						declarations: [
							{
								type: 'declaration',
								property: 'margin-left',
								value: toFixed(x, options.decimals) + '%' + ' !important'
							}
						]
					});
				}

				mediaRules.push({
					type: 'rule',
					selectors: ['.' + name + '-reset-order'],
					declarations: [
						{
							type: 'declaration',
							property: 'margin-left',
							value: 0
						},
						{
							type: 'declaration',
							property: 'margin-right',
							value: 0
						},
						{
							type: 'declaration',
							property: 'left',
							value: 'auto'
						},
						{
							type: 'declaration',
							property: 'right',
							value: 'auto'
						},
						{
							type: 'declaration',
							property: 'float',
							value: 'left'
						}
					]
				});

				mediaRules.push({
					type: 'rule',
					selectors: [columnSelector + '.' + name + '-centered'],
					declarations: [
						{
							type: 'declaration',
							property: 'margin-left',
							value: 'auto'
						},
						{
							type: 'declaration',
							property: 'margin-right',
							value: 'auto'
						},
						{
							type: 'declaration',
							property: 'float',
							value: 'none'
						}
					]
				});

				mediaRules.push({
					type: 'rule',
					selectors: [columnSelector + '.' + name + '-uncentered'],
					declarations: [
						{
							type: 'declaration',
							property: 'margin-left',
							value: 0
						},
						{
							type: 'declaration',
							property: 'margin-right',
							value: 0
						},
						{
							type: 'declaration',
							property: 'float',
							value: 'left'
						}
					]
				});

				mediaRules.push({
					type: 'rule',
					selectors: [columnSelector + '.' + name + '-centered:last-child'],
					declarations: [
						{
							type: 'declaration',
							property: 'float',
							value: 'none'
						}
					]
				});

				mediaRules.push({
					type: 'rule',
					selectors: [columnSelector + '.' + name + '-uncentered:last-child'],
					declarations: [
						{
							type: 'declaration',
							property: 'float',
							value: 'left'
						}
					]
				});

				mediaRules.push({
					type: 'rule',
					selectors: [columnSelector + '.' + name + '-uncentered.opposite'],
					declarations: [
						{
							type: 'declaration',
							property: 'float',
							value: 'right'
						}
					]
				});

				mediaRules.push({
					type: 'rule',
					selectors: [rowSelector + '.' + name + '-collapse > ' + columnSelector],
					declarations: [
						{
							type: 'declaration',
							property: 'padding-left',
							value: 0
						},
						{
							type: 'declaration',
							property: 'padding-right',
							value: 0
						}
					]
				});

				mediaRules.push({
					type: 'rule',
					selectors: [rowSelector + '.' + name + '-collapse ' + rowSelector],
					declarations: [
						{
							type: 'declaration',
							property: 'margin-left',
							value: 0
						},
						{
							type: 'declaration',
							property: 'margin-right',
							value: 0
						}
					]
				});

				mediaRules.push({
					type: 'rule',
					selectors: [rowSelector + '.' + name + '-uncollapse > ' + columnSelector],
					declarations: [
						{
							type: 'declaration',
							property: 'padding-left',
							value: halfGutter + options.unit
						},
						{
							type: 'declaration',
							property: 'padding-right',
							value: halfGutter + options.unit
						},
						{
							type: 'declaration',
							property: 'float',
							value: 'left'
						}
					]
				});

				if (index > 0) {
					for (i = 0; i < options.columns; i++) {
						x = columnWidth * i;

						mediaRules.push({
							type: 'rule',
							selectors: ['.push-' + i],
							declarations: [
								{
									type: 'declaration',
									property: 'position',
									value: 'relative'
								},
								{
									type: 'declaration',
									property: 'left',
									value: toFixed(x, options.decimals) + '%'
								},
								{
									type: 'declaration',
									property: 'right',
									value: 'auto'
								}
							]
						});

						mediaRules.push({
							type: 'rule',
							selectors: ['.pull-' + i],
							declarations: [
								{
									type: 'declaration',
									property: 'position',
									value: 'relative'
								},
								{
									type: 'declaration',
									property: 'right',
									value: toFixed(x, options.decimals) + '%'
								},
								{
									type: 'declaration',
									property: 'left',
									value: 'auto'
								}
							]
						});
					}
				}

				rules.push({
					type: 'media',
					media: options.mediaQueries[name],
					rules: mediaRules
				});
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
