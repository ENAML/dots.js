var buildPath = global._root + "/";
var projectPath = buildPath.replace("build/", "");
var rootPath = projectPath + "public/";
var assetPath = rootPath + "assets/";
var gulpPath = buildPath + "gulp/";

var serverPath = projectPath + "server/";

var paths = {

	projectPath: projectPath,
	buildPath: buildPath,
	rootPath: rootPath,
	assetPath: assetPath,
	gulpPath: gulpPath,

	build: {
		bower: buildPath + 'bower_components/',
		bowerJSON: buildPath + 'bower.json',
		templates: buildPath + "templates/",
		nodeModules: buildPath + "node_modules/"
	},

	js: {
		base: assetPath + "js/",
		user: assetPath + "js/user/",
		vendor_config: assetPath + "js/vendor_config.json",
		lib: assetPath + "js/lib/",
		bower: assetPath + "js/lib/bower/",
		compiled: assetPath + "js/compiled/",
		min: assetPath + "js/min/",

		templates: rootPath + "views/"
	},

	styles: {
		icons: assetPath + "icons/",
		sass: assetPath + "styles/sass/",
		fonts: assetPath + "styles/fonts/",
		css: assetPath + "styles/css/",
		min: assetPath + "styles/min/",
		shared: assetPath + "styles/shared/"
	},

	server: {
		base: serverPath,
		app: serverPath + "app.js",
	},

	//misc
	noop: gulpPath + "other/noop.js"
};

module.exports = paths;