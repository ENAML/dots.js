var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;

var User = require('../models/user');

var authOpts;

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

  authOpts = options;

  // if success and failure redirects aren't specified,
  // set some reasonable defaults
  if (!authOpts.successRedirect) authOpts.successRedirect = '/account';
  if (!authOpts.failureRedirect) authOpts.failureRedirect = '/login';

  return {
    init: function() {
      var env = app.get('env');
      var config = authOpts.providers;

      // configure facebook strategy
      passport.use(new FacebookStrategy({
        clientID: config.facebook[env].appId,
        clientSecret: config.facebook[env].appSecret,
        callbackURL: (authOpts.baseUrl || '') + '/auth/facebook/callback',
      }, function(accessToken, refreshToken, profile, done) {
        var authId = 'facebook:' + profile.id;

        // not in available keys - return error
        if (authOpts.adminKeys.indexOf(authId) === -1) {
          return done(new Error('Login does not match any existing admins'),
            null);
        }

        // check for user in database
        User.findOne({authId: authId}, function(err, user) {
          if (err) return done(err, null);
          if (user) return done(null, user);

          // if no errors and no user found, make new one
          user = new User({
            authId: authId,
            name: profile.displayName,
            created: Date.now(),
            role: 'admin'
          });
          user.save(function(err) {
            if (err) return done(err, null);
            done(null, user);
          });
        });
      }));

      passport.use(new TwitterStrategy({
        consumerKey: config.twitter[env].appKey,
        consumerSecret: config.twitter[env].appSecret,
        callbackURL: (authOpts.baseUrl || '') + '/auth/twitter/callback'
      }, function(token, tokenSecret, profile, done) {
        var authId = 'twitter:' + profile.id;

        // not in available keys - return error
        if (authOpts.adminKeys.indexOf(authId) === -1) {
          return done(new Error('Login does not match any existing admins'),
            null);
        }

        // check for user in database
        User.findOne({authId: authId}, function(err, user) {
          if (err) return done(err, null);
          if (user) return done(null, user);

          // if no errors and no user found, make new one
          user = new User({
            authId: authId,
            name: profile.username,
            created: Date.now(),
            role: 'admin'
          });
          user.save(function(err) {
            if (err) return done(err, null);
            done(null, user);
          });
        });
      }));

      app.use(passport.initialize());
      app.use(passport.session());
    },
    registerRoutes: function() {

      // register facebook routes
      app.get('/auth/facebook', function(req, res, next) {

        /**
         * adding a redirect url to a querystring is useful if there are
         * multiple urls from which users can login - you can pass the
         * current URL in as a querystring and then you can handle where
         * to redirect to once passport has completed authentication
         */
        if (req.query.redirect) req.session.authRedirect = req.query.redirect;

        passport.authenticate('facebook')(req, res, next);
      });

      app.get('/auth/facebook/callback', passport.authenticate('facebook',
        { failureRedirect: authOpts.failureRedirect }),
        function(req, res) {

        // we only get here on successful authentication
        console.log('successful login');
        var redirect = req.session.authRedirect;
        if (redirect) delete req.session.authRedirect;
        res.redirect(303, redirect || authOpts.successRedirect);
      });

      // register twitter routes
      app.get('/auth/twitter', function(req, res, next) {
        if (req.query.redirect) req.session.authRedirect = req.query.redirect;

        passport.authenticate('twitter')(req, res, next);
      });

      app.get('/auth/twitter/callback', passport.authenticate('twitter',
        { failureRedirect: authOpts.failureRedirect }),
        function(req, res) {

        // we only get here on successful authentication
        console.log('successful login');
        var redirect = req.session.authRedirect;
        if (redirect) delete req.session.authRedirect;
        res.redirect(303, redirect || authOpts.successRedirect);
      });
    }
  }
};