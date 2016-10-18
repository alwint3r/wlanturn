'use strict';

const jwt = require(`jsonwebtoken`);
const sqlite3 = require(`../lib/sqlite3`).getInstance();
const config = require(`../config/`);
const bcrypt = require(`bcrypt`);

/* eslint no-param-reassign: 0 */

module.exports = {
  authenticate(req, res, next) {
    sqlite3.serialize(() => {
      const username = req.body.username;
      const password = req.body.password;

      sqlite3.get(`SELECT * FROM account WHERE username = "${username}"`, (err, user) => {
        if (err) {
          return next(new Error(`Failed to authenticate due to internal error`));
        }

        if (!user) {
          const error = new Error(`Username/password mismatch`);
          error.status = 401;

          return next(error);
        }

        if (!bcrypt.compareSync(password, user.password)) {
          const error = new Error(`Username/password mismatch`);
          error.status = 401;

          return next(error);
        }

        const token = jwt.sign({ username: user.username }, config.jwt.secret, {
          expiresIn: config.jwt.expiresIn,
        });

        return res.json({
          error: false,
          token,
        });
      });
    });
  },

  authorizeRequest(req, res, next) {
    function sendUnauthorized() {
      const error = new Error(`You are not authorized`);
      error.status = 401;

      return next(error);
    }

    const auth = req.headers.authorization ?
      req.headers.authorization.split(` `)[0] : false;

    if (!auth || auth !== `Bearer`) {
      return sendUnauthorized();
    }

    const token = req.headers.authorization.split(` `).pop();

    if (!token) {
      return sendUnauthorized();
    }

    return jwt.verify(token, config.jwt.secret, (err, decoded) => {
      if (err) {
        return sendUnauthorized();
      }

      req.jwt_token = decoded;

      return next();
    });
  },
};
