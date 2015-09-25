module.exports = {
	options:
	{
		mangle: true,
		compress: {},
		banner: "/*! <%= pkg.name %> <%= grunt.template.today( 'yyyy-mm-dd' ) %> */\n",
		sourceMap: false
	},
	project:
	{
		files:
		{
			"dist/<%= pkg.name %>.min.js": [
				"dist/<%= pkg.name %>.js"
			]
		}
	}
};
