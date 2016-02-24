var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var User = require('../models/user');

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    if (err || !user) return done(err, null);

    done(null, user);
  });
});

module.exports = function(app, options) {

  // if success and failure redirects aren't specified,
  // set some reasonable defaults
  if (!options.successRedirect) options.successRedirect = '/account';
  if (!options.failureRedirect) options.failureRedirect = '/login';

  return {
    init: function() {
      var env = app.get('env');
      var config = options.providers;

      // configure facebook strategy
      passport.use(new FacebookStrategy({
        clientID: config.facebook[env].appId,
        clientSecret: config.facebook[env].appSecret,
        callbackURL: (options.baseUrl || '') + '/auth/facebook/callback',
      }, function(accessToken, refreshToken, profile, done) {
        var authId = 'facebook:' + profile.id;

        // check for user in database
        User.findOne({authId: authId}, function(err, user) {
          if (err) return done(err, null);
          if (user) return done(null, user);

          // if no errors and no user found, make new one
          user = new User({
            authId: authId,
            name: profile.displayName,
            created: Date.now(),
            role: 'customer'
          });
          user.save(function(err) {
            if (err) return done(err, null);
            done(null, user);
          });
        });
      }));

      // configure twitter strategy
      /**
       * TODO: configure twitter strategy
       */

      app.use(passport.initialize());
      app.use(passport.session());
    },
    registerRoutes: function() {

      // register facebook routes
      app.get('/auth/facebook', function(req, res, next) {
        if (req.query.redirect) req.session.authRedirect = req.query.redirect;
        passport.authenticate('facebook')(req, res, next);
      });
      app.get('/auth/facebook/callback', passport.authenticate('facebook',
        { failureRedirect: options.failureRedirect }),
        function(req, res) {

        // we only get here on successful authentication
        var redirect = req.session.authRedirect;
        if (redirect) delete req.session.authRedirect;
        res.redirect(303, redirect || options.successRedirect);
      });
    }
  }
};