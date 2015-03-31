# grunt-bambu-grid [![Build Status](https://secure.travis-ci.org/netbek/grunt-bambu-grid.png?branch=master)](http://travis-ci.org/netbek/grunt-bambu-grid)

Grunt plugin to generate CSS grids

## Getting Started
This plugin requires [Grunt](http://gruntjs.com/) `~0.4.5`

````javascript
// Gruntfile.js configuration
grunt.loadNpmTasks('grunt-bambu-grid');

grunt.initConfig({
	bambu_grid: {
		grid: {
			options: {
				columns: 12, // Number of columns.
				gutter: 2, // Space between columns.
				unit: 'rem', // em, rem (http://caniuse.com/#feat=rem)
				decimals: 5, // Determines the accuracy of column widths.
				rowClass: 'row', // Row class name.
				columnClass: 'column', // Column class name.
				mediaQueries: {
					xsmall: 'screen and (min-width: 0em)', // 0px
					small: 'screen and (min-width: 40em)', // 640px
					medium: 'screen and (min-width: 62em)', // 992px
					large: 'screen and (min-width: 90em)', // 1440px
					xlarge: 'screen and (min-width: 120em)' // 1920px
				}
			},
			dest: 'test/css/grid.css'
		}
	}
});
````

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 0.1.0 First release

## Credits
* CSS and test page from [Foundation](https://github.com/zurb/foundation) (ZURB, inc., MIT license)

## License
Copyright (c) 2015 Hein Bekker. Licensed under the MIT license.
