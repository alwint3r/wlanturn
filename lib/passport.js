'use strict';

const passport = require(`passport`);
const LocalStrategy = require(`passport-local`).Strategy;
const sqlite3 = require(`./sqlite3`).getInstance();
const bcrypt = require(`bcrypt`);

passport.use(new LocalStrategy((username, password, done) => {
  sqlite3.serialize(() => {
    sqlite3.get(`SELECT * FROM account WHERE username = "${username}"`, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false);
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

module.exports = passport;
