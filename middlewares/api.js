'use strict';

const Router = require(`express`).Router;
const router = new Router();

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

router.post(`/connect`, (req, res) =>
  res.json({
    connected: nmcli.connect(req.body.ssid, req.body.password),
  })
);

router.post(`/disconnect`, (req, res) =>
  res.json({
    disconnected: nmcli.disconnect(req.body.iface),
  })
);

module.exports = router;
