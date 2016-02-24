// --------------------------------------------------------------------------
//  Imports:
// --------------------------------------------------------------------------

// globals
global.utils = require('./lib/utils'); // need to define global.utils first
utils.newGlobal('_', 'underscore');

// node modules
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// own modules
var routes = require('./routes');



// --------------------------------------------------------------------------
//  Main App:
// --------------------------------------------------------------------------

var app = express();


// --------------------------------------------------------------------------
//  Handlebars:
// --------------------------------------------------------------------------

var handlebars = require('express-handlebars').create({
    layoutsDir: '../public/views/layouts/',
    partialsDir: '../public/views/partials/',
    defaultLayout:'main',
    extname: '.hbs',
    helpers: {
        section: function(name, options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');
app.set('views', '../public/views/');



// --------------------------------------------------------------------------
//  Port:
// --------------------------------------------------------------------------

app.set('port', process.env.PORT || 3000);



// --------------------------------------------------------------------------
//  Middleware:
// --------------------------------------------------------------------------

// middleware for processing request bodies (usually POST)
app.use(bodyParser.urlencoded({ extended: true }));

// middleware for serving static files
app.use(express.static(path.join(__dirname, '/..', '/public')));

// add data to res.locals.partials
// (for use with .handlebars partials)
app.use(function(req, res, next) {
  if (!res.locals.partials) res.locals.partials = {};
  // res.locals.partials.weatherContext = require('./lib/getWeatherData')();
  next();
});


// --------------------------------------------------------------------------
// Routing:
// --------------------------------------------------------------------------

routes(app);



// --------------------------------------------------------------------------
// Errors:
// --------------------------------------------------------------------------

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
  res.status(404);
  res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});



// --------------------------------------------------------------------------
// Start Server:
// --------------------------------------------------------------------------

function startServer() {
  app.listen(app.get('port'), function(){
    console.log( 'Express started in ' + app.get('env') + 
      'on http://localhost:' + app.get('port') +
      '\npress Ctrl-C to terminate.' );
  });
}

if (require.main === module) {
  // require.main only = module if it is called directly
  // application run directly; start app server
  startServer();
} else {
  // application imported as a module via "require":
  // export function // to create server
  module.exports = startServer;
}