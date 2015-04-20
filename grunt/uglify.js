module.exports = {
	options:
	{
		mangle: true,
		compress: {},
		banner: "/*! <%= pkg.name %> <%= grunt.template.today( 'yyyy-mm-dd' ) %> */",
		sourceMap: false
	},
	project:
	{
		files:
		{
			"dist/<%= pkg.name %>.min.js": [
				"source/*.js"
			]
		}
	}
};
