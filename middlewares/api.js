'use strict';

const async = require(`async`);
const Router = require(`express`).Router;
const router = new Router();
const jwtAuth = require(`./authentication`);
const sqlite3 = require(`../lib/sqlite3`).getInstance();
const bcrypt = require(`bcrypt`);

const nmcli = require(`../lib/nmcli`);

router.get(`/access_points`, jwtAuth.authorizeRequest, (req, res, next) => {
  nmcli.listAp((err, result) => {
    if (err) {
      return next(err);
    }

    return res.json({ error: false, result });
  });
});

router.get(`/wireless_devices`, (req, res) =>
  res.json(nmcli.listWirelessDevice())
);

router.get(`/wifi_active_connections`, (req, res, next) => {
  const devices = nmcli.listWirelessDevice()
    .filter(dev => dev.state === `connected`)
    .map(dev => dev.device);

  async.map(devices, (device, done) => {
    nmcli.activeConnectionOnIface(device, (err, connection) => {
      if (err) return done(err);
      return done(null, connection);
    });
  },

  (err, result) => {
    if (err) {
      return next(err);
    }

    return res.json({ active_connections: result });
  });
});

router.post(`/connect`, jwtAuth.authorizeRequest, (req, res, next) => {
  nmcli.connect(req.body.ssid, req.body.password, req.body.force, (err) => {
    if (err) {
      return next(new Error(`Failed to connect to AP. Try force connect & change the password`));
    }

    return res.json({ error: false, connected: true });
  });
});

router.post(`/disconnect`, jwtAuth.authorizeRequest, (req, res, next) => {
  nmcli.disconnect(req.body.iface, (err) => {
    if (err) {
      return next(new Error(`Failed to disconnect interface ${req.body.iface}`));
    }

    return res.json({ error: false, disconnected: true });
  });
});

router.post(`/login`, jwtAuth.authenticate);

router.post(`/change_pass`, jwtAuth.authorizeRequest, (req, res, next) => {
  sqlite3.serialize(() => {
    const payload = {
      oldPassword: req.body.oldPassword,
      newPassword: req.body.newPassword,
      confirmNewPassword: req.body.confirmNewPassword,
    };

    const username = req.jwt_token.username;

    if (payload.newPassword !== payload.confirmNewPassword) {
      const error = new Error(`Password & confirm password do not match`);
      error.status = 401;

      return next(error);
    }

    return sqlite3.get(`SELECT * FROM account WHERE username = "${username}"`, (getErr, user) => {
      if (getErr) {
        return next(new Error(`Failed to verify old password`));
      }

      if (!user) {
        return next(new Error(`User is not found`));
      }

      if (!bcrypt.compareSync(payload.oldPassword, user.password)) {
        return next(new Error(`Old password mismatch`));
      }

      const hashed = bcrypt.hashSync(payload.newPassword, 8);

      return sqlite3.run(`UPDATE account SET password = "${hashed}" WHERE username = "${username}"`, (updateErr) => {
        if (updateErr) {
          return next(new Error(`Failed to update password`));
        }

        return res.json({ error: false, updated: true });
      });
    });
  });
});

module.exports = router;
