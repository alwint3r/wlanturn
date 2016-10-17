'use strict';

const Router = require(`express`).Router;
const router = new Router();
const passport = require(`../lib/passport`);

const nmcli = require(`../lib/nmcli`);

router.get(`/access_points`, (req, res) =>
  res.json(nmcli.listAp())
);

router.get(`/wireless_devices`, (req, res) =>
  res.json(nmcli.listWirelessDevice())
);

router.get(`/active_connection/:iface`, (req, res) =>
 res.json(nmcli.activeConnectionOnIface(req.params.iface))
);

router.get(`/wifi_active_connections`, (req, res) => {
  const devices = nmcli.listWirelessDevice()
    .filter(dev => dev.state === `connected`)
    .map(dev => dev.device);

  return res.json({
    active_connections: devices.map(dev => nmcli.activeConnectionOnIface(dev)),
  });
});

router.post(`/connect`, (req, res) =>
  res.json({
    connected: nmcli.connect(req.body.ssid, req.body.password, req.body.force),
  })
);

router.post(`/disconnect`, (req, res) =>
  res.json({
    disconnected: nmcli.disconnect(req.body.iface),
  })
);

router.post(`/login`, (req, res) => {
  passport.authenticate(`local`, (err, user) => {
    if (err) {
      return res.json({ error: true, message: `Failed to authenticate` });
    }

    if (!user) {
      return res.json({ error: true, message: `Username/password mismatch` });
    }

    return req.login(user, (writeErr) => {
      if (writeErr) {
        return res.json({ error: true, message: `Failed to write session` });
      }

      const newUser = user;
      delete newUser.password;

      return res.json({ error: false, user: newUser });
    });
  })(req, res);
});

router.post(`/logout`, (req, res) => {
  req.session.destroy(() => {
    res.json({ error: false, message: `Logged out` });
  });
});

module.exports = router;
