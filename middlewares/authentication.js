'use strict';

const jwt = require(`jsonwebtoken`);
const sqlite3 = require(`../lib/sqlite3`).getInstance();
const config = require(`../config/`);

module.exports = {
  authenticate(req, res) {
    sqlite3.serialize(() => {
      const username = req.body.username;

      sqlite3.get(`SELECT * FROM account WHERE username = "${username}"`, (err, user) => {
        if (err) {
          res.status(500);

          return res.json({ error: true, message: `Failed to authenticate due to internal error` });
        }

        if (!user) {
          res.status(401);

          return res.json({ error: true, message: `Username/password mismatch` });
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
    function sendUnauthorized(response) {
      response.status(401);

      return response.json({
        error: true,
        message: `You are not authorized`,
      });
    }

    const auth = req.headers.authorization ?
      req.headers.authorization.split(` `)[0] : false;

    if (!auth || auth !== `Bearer`) {
      return sendUnauthorized(res);
    }

    const token = req.headers.authorization.split(` `).pop();

    if (!token) {
      return sendUnauthorized(res);
    }

    return jwt.verify(token, config.jwt.secret, (err) => {
      if (err) {
        res.status(401);

        return res.json({
          error: true,
          message: `Failed to authorize request`,
        });
      }

      return next();
    });
  },
};
